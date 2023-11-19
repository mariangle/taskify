using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Models;
using server.Services;
using TaskModel = server.Models.Task;


namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;

        public TasksController(ApplicationContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTask()
        {

            if (_context.Tasks == null)
            {
                return NotFound();
            }

            var tasks = await _context.Tasks
                .Include(task => task.User) 
                .ToListAsync();

            return tasks;
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTask(Guid id)
        {
            if (_context.Tasks == null)
            {
                return NotFound();
            }
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutTask(Guid id, TaskModel task)
        {
            if (id != task.Id)
            {
                return BadRequest("No permission");
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized("Unauthorized.");
            }

            Guid userId = _userService.GetUserId();
            task.UserId = userId;

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TaskModel>> PostTask(TaskModel task)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'ApplicationContext.Task'  is null.");
            }

            Guid userId = _userService.GetUserId();
            task.UserId = userId;

            if (string.IsNullOrEmpty(task.Title) || task.DueDate == DateTime.MinValue)
            {
                return BadRequest("You must provide both a date and a title.");
            }

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            if (_context.Tasks == null)
            {
                return NotFound();
            }
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Tasks/2/Subtask
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}/subtask")]
        public async Task<ActionResult<Subtask>> PostSubtask(Guid id, Subtask subtask)
        {
            if (_context.Subtasks == null)
            {
                return Problem("Entity set 'ApplicationContext.Subtask'  is null.");
            }

            subtask.Id = id;

            _context.Subtasks.Add(subtask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubtask", new { id = subtask.Id }, subtask);
        }

        // POST: api/Tasks/2/RecurringTask
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}/reccuring_task")]
        public async Task<ActionResult<RecurringTask>> PostRecurringTask(Guid id, RecurringTask recurringTask)
        {
            if (_context.RecurringTasks == null)
            {
                return Problem("Entity set 'ApplicationContext.RecurringTask'  is null.");
            }

            recurringTask.Id = id;

            _context.RecurringTasks.Add(recurringTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecurringTask", new { id = recurringTask.Id }, recurringTask);
        }

        private bool TaskExists(Guid id)
        {
            return (_context.Tasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private bool IsAuthorized(Guid taskId)
        {
            Guid userId = _userService.GetUserId();
            return _context.Tasks.Any(e => e.Id == taskId && e.UserId == userId);
        }
    }
}
