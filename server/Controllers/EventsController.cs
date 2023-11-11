using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;

        public EventsController(ApplicationContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // GET: api/Events
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }

            Guid userId = _userService.GetUserId();

            var events = await _context.Events
                .Where(e => e.UserId == userId)
                .ToListAsync();

            return events;
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            var @event = await _context.Events.FindAsync(id);


            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutEvent(Guid id, Event @event)
        {
            if (id != @event.Id)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;


            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            if (_context.Events == null)
            {
                return Problem("Entity set 'ApplicationContext.Events'  is null.");
            }

            if (string.IsNullOrEmpty(@event.Title) || @event.StartDate == DateTime.MinValue)
            {
                return BadRequest("You must provide both a date and a title.");
            }

            Guid userId = _userService.GetUserId();

            @event.UserId = userId;

            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.Id }, @event);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            var @event = await _context.Events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(Guid id)
        {
            return (_context.Events?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        private bool IsAuthorized(Guid eventId)
        {
            Guid userId = _userService.GetUserId();
            return _context.Events.Any(e => e.Id == eventId && e.UserId == userId);
        }
    }
}
