using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecurringTasksController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public RecurringTasksController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/RecurringTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecurringTask>>> GetRecurringTask()
        {
          if (_context.RecurringTasks == null)
          {
              return NotFound();
          }
            return await _context.RecurringTasks.ToListAsync();
        }

        // GET: api/RecurringTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecurringTask>> GetRecurringTask(Guid id)
        {
          if (_context.RecurringTasks == null)
          {
              return NotFound();
          }
            var recurringTask = await _context.RecurringTasks.FindAsync(id);

            if (recurringTask == null)
            {
                return NotFound();
            }

            return recurringTask;
        }

        // PUT: api/RecurringTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecurringTask(Guid id, RecurringTask recurringTask)
        {
            if (id != recurringTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(recurringTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecurringTaskExists(id))
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

        // POST: api/RecurringTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecurringTask>> PostRecurringTask(RecurringTask recurringTask)
        {
          if (_context.RecurringTasks == null)
          {
              return Problem("Entity set 'ApplicationContext.RecurringTask'  is null.");
          }
            _context.RecurringTasks.Add(recurringTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecurringTask", new { id = recurringTask.Id }, recurringTask);
        }

        // DELETE: api/RecurringTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecurringTask(Guid id)
        {
            if (_context.RecurringTasks == null)
            {
                return NotFound();
            }
            var recurringTask = await _context.RecurringTasks.FindAsync(id);
            if (recurringTask == null)
            {
                return NotFound();
            }

            _context.RecurringTasks.Remove(recurringTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecurringTaskExists(Guid id)
        {
            return (_context.RecurringTasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
