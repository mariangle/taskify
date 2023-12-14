using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using NuGet.ProjectModel;
using server.Context;
using server.Models;
using server.Services;
using System.Runtime.InteropServices;
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
            [FromQuery] Guid? labelId,
            [FromQuery] Guid? projectId,
            [FromQuery] bool? unsorted = false,
            [FromQuery] bool? upcoming = false,
            [FromQuery] bool? overdue = false,
            [FromQuery] bool? incomplete = false
)
        {
            IQueryable<TaskModel> tasksQuery = _context.Tasks;

            if (listId.HasValue)
            {
                tasksQuery = tasksQuery.Where(task => task.ListId == listId);
            }

            if (projectId.HasValue)
            {
                tasksQuery = tasksQuery.Where(task => task.ProjectId == projectId);
            }

            if (labelId.HasValue)
            {
                // Tasks with a specific label
                tasksQuery = tasksQuery.Where(task => task.Labels.Any(label => label.Id == labelId));
            }

            if (unsorted == true)
            {
                tasksQuery = tasksQuery.Where(task => task.ListId == null);
            }

            if (upcoming == true)
            {
                // Filter tasks that are upcoming (due date is after today and task is not completed)
                tasksQuery = tasksQuery
                    .Where(task => task.DueDate > DateTime.Today && task.Status == Status.Incomplete)
                    .OrderBy(task => task.DueDate);
            }

            if (overdue == true)
            {
                // Filter tasks that are overdue (due date is before today and task is not completed)
                tasksQuery = tasksQuery
                    .Where(task => task.DueDate < DateTime.Today && task.Status == Status.Incomplete);
            }

            if (incomplete == true)
            {
                tasksQuery = tasksQuery
                    .Where(task => task.Status == Status.Incomplete);
            }

            var tasks = await tasksQuery
                .Include(t => t.Labels)
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
            var task = await _context.Tasks
               .Include(task => task.Labels)
               .FirstOrDefaultAsync(t => t.Id == id);

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

            task.UserId = _userService.GetUserId();

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                var updatedTask = await _context.Tasks.FindAsync(id);

                if (updatedTask == null)
                {
                    return NotFound();
                }

                return Ok(updatedTask);
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

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TaskModel>> PostTask(TaskModel task)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'ApplicationContext.Task' is null.");
            }

            Guid userId = _userService.GetUserId();
            task.UserId = userId;

            if (string.IsNullOrEmpty(task.Name))
            {
                return BadRequest("Name field is required.");
            }

            try
            {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTask", new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTask(Guid id)
        {

            var task = await _context.Tasks
                .Include(t => t.Labels) 
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound("Task not found.");
            }

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

            try
            {
                // Remove labels first. Probably wanna do this onCascade
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

        // POST: api/TaskLabels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{taskId}/labels/{labelId}")]
        [Authorize]
        public async Task<ActionResult> AddLabelToTask([FromRoute] Guid taskId, [FromRoute] Guid labelId)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(taskId);
                var label = await _context.Labels.FindAsync(labelId);

                if (task != null && label != null)
                {
                    // Initialize the Labels collection if it's null
                    if (task.Labels == null)
                    {
                        task.Labels = new List<Label>();
                    }

                    task.Labels.Add(label);
                    await _context.SaveChangesAsync();

                    return Ok("Label added to the task successfully.");
                }
                else
                {
                    return BadRequest("Invalid task or label.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }


        // DELETE: api/TaskLabels/5
        [HttpDelete("{taskId}/labels/{labelId}")]
        [Authorize]
        public async Task<IActionResult> RemoveLabelFromTask(Guid taskId, Guid labelId)
        {

            // Find the task based on taskId
            var task = await _context.Tasks.Include(t => t.Labels)
                .FirstOrDefaultAsync(t => t.Id == taskId);

            if (task == null)
            {
                return NotFound("Task not found.");
            }

            // Find the label based on labelId
            var label = await _context.Labels.FindAsync(labelId);

            if (label == null)
            {
                return NotFound("Label not found.");
            }

            // Check if the label is associated with the task before removing
            if (task.Labels.Contains(label))
            {
                // Remove the label from the task's Labels collection
                task.Labels.Remove(label);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            else
            {
                return BadRequest("Cannot remove a label that has not been added to the task.");
            }
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
