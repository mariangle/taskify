using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Models;
using server.Services;
using System.Threading.Tasks;
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
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks(
            [FromQuery] Guid? listId,
            [FromQuery] bool? unsorted = false,
            [FromQuery] bool? upcoming = false,
            [FromQuery] bool? overdue = false
            )
        {
            IQueryable<TaskModel> tasksQuery = _context.Tasks;

            if (listId.HasValue)
            {
                tasksQuery = tasksQuery.Where(task => task.ListId == listId);
            }

            else if (unsorted == true)
            {
                tasksQuery = tasksQuery.Where(task => task.ListId == null);
            }

            if (upcoming == true)
            {
                // Filter tasks that are upcoming (due date is after today)
                tasksQuery = tasksQuery
                    .Where(task => task.DueDate > DateTime.Today)
                    .OrderBy(task => task.DueDate)
                    .Take(10);
            }

            if (overdue == true)
            {
                // Filter tasks that are overdue (due date is before today and task is not completed)
                tasksQuery = tasksQuery
                        .Where(task => task.DueDate < DateTime.Today && task.Status == Status.Incomplete);
            }
            var tasks = await tasksQuery.ToListAsync();

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
                return BadRequest("Bad request");
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

            if (string.IsNullOrEmpty(task.Name) || task.DueDate == DateTime.MinValue)
            {
                return BadRequest("You must provide both a date and a name.");
            }

            try
            {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTask", new { id = task.Id }, task);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTask(Guid id)
        {

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            try
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
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

            try
            {
                _context.Subtasks.Add(subtask);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSubtask", new { id = subtask.Id }, subtask);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Tasks/2/RecurringTask
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}/reccuring_task")]
        [Authorize]
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
            return _context.Tasks.Any(t => t.Id == taskId && t.UserId == userId);
        }
    }
}
