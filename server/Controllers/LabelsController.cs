using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;

        public LabelsController(ApplicationContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // GET: api/Labels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Label>>> GetLabel()
        {
            if (_context.Labels == null)
            {
                return NotFound();
            }
            return await _context.Labels.ToListAsync();
        }

        // GET: api/Labels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Label>> GetLabel(Guid id)
        {
            if (_context.Labels == null)
            {
                return NotFound();
            }
            var label = await _context.Labels.FindAsync(id);

            if (label == null)
            {
                return NotFound();
            }

            return label;
        }

        // PUT: api/Labels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabel(Guid id, Label label)
        {
            if (id != label.Id)
            {
                return BadRequest();
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            label.UserId = _userService.GetUserId();
            _context.Entry(label).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabelExists(id))
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

        // POST: api/Labels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Label>> PostLabel(Label label)
        {
            if (_context.Labels == null)
            {
                return Problem("Entity set 'ApplicationContext.Label'  is null.");
            }

            label.UserId = _userService.GetUserId();

            _context.Labels.Add(label);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLabel", new { id = label.Id }, label);
        }

        // DELETE: api/Labels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLabel(Guid id)
        {
            if (_context.Labels == null)
            {
                return NotFound();
            }

            // Retrieve tasks with the label and include the Labels collection
            var tasksWithLabel = _context.Tasks
                .Include(t => t.Labels)
                .Where(t => t.Labels.Any(l => l.Id == id));

            foreach (var task in tasksWithLabel)
            {
                // Remove the label from the Labels collection of the task
                var labelToRemove = task.Labels.FirstOrDefault(l => l.Id == id);
                if (labelToRemove != null)
                {
                    task.Labels.Remove(labelToRemove);
                }
            }

            // Remove the label itself
            var label = await _context.Labels.FindAsync(id);
            if (label != null)
            {
                _context.Labels.Remove(label);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        private bool LabelExists(Guid id)
        {
            return (_context.Labels?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        private bool IsAuthorized(Guid listId)
        {
            Guid userId = _userService.GetUserId();
            return _context.Labels.Any(l => l.Id == listId && l.UserId == userId);
        }
    }
}
