using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Models;
using server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;

        public ListsController(ApplicationContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // GET: api/Lists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<List>>> GetLists()
        {
            if (_context.Lists == null)
            {
                return NotFound();
            }

            return await _context.Lists.ToListAsync();
        }

        // GET: api/Lists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List>> GetList(Guid id)
        {
            if (_context.Lists == null)
            {
                return NotFound();
            }

            var list = await _context.Lists
                .Include(l => l.Tasks!)
                    .ThenInclude(t => t.Labels!) 
                .FirstOrDefaultAsync(l => l.Id == id);

            if (list == null)
            {
                return NotFound();
            }

            return list;
        }

        // PUT: api/Lists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutList(Guid id, List list)
        {
            if (id != list.Id)
            {
                return BadRequest();
            }

            Guid userId = _userService.GetUserId();
            list.UserId = userId;

            _context.Entry(list).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!ListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Lists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<List>> PostList(List list)
        {
            if (_context.Lists == null)
            {
                return Problem("Entity set 'ApplicationContext.List'  is null.");
            }

            list.UserId = _userService.GetUserId();

            try
            {
                _context.Lists.Add(list);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetList", new { id = list.Id }, list);
            } catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }

        }

        // DELETE: api/Lists/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteList(Guid id)
        {
            var list = await _context.Lists.FindAsync(id);

            if (list == null)
            {
                return NotFound("Not found");
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            Guid userId = _userService.GetUserId();
            var tasks = _context.Tasks
                .Where(t => t.UserId == userId)
                .Where(t => t.ListId == id)
                .ToList();

            _context.Tasks.RemoveRange(tasks);
            _context.Lists.Remove(list);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListExists(Guid id)
        {
            return (_context.Lists?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private bool IsAuthorized(Guid listId)
        {
            Guid userId = _userService.GetUserId();
            return _context.Lists.Any(l => l.Id == listId && l.UserId == userId);
        }
    }
}
