using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api")]
    [ApiController]
    public class TaskLabelsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;

        public TaskLabelsController(ApplicationContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpGet("tasks/{taskId}/labels")]
        public IActionResult GetLabelsForTask(Guid taskId)
        {
            try
            {
                // Retrieve labels associated with the task
                var labels = _context.TaskLabels
                    .Where(tl => tl.TaskId == taskId)
                    .Select(tl => tl.Label)
                    .ToList();

                return Ok(labels);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/TaskLabels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("tasks/{taskId}/labels/{labelId}")]
        [Authorize]
        public async Task<ActionResult<TaskLabel>> PostTaskLabel([FromRoute] Guid taskId, [FromRoute] Guid labelId)
        {
            if (_context.TaskLabels == null)
            {
                return Problem("Entity set 'ApplicationContext.TaskLabels'  is null.");
            }

            // Check if the task and label exist
            var task = await _context.Tasks.FindAsync(taskId);
            var label = await _context.Labels.FindAsync(labelId);

            if (task == null || label == null)
            {
                return NotFound("Task or label not found.");
            }

            // Check if the relation already exists
            var taskLabel = await _context.TaskLabels
                .FirstOrDefaultAsync(tl => tl.TaskId == taskId && tl.LabelId == labelId);

            if (taskLabel != null)
            {
                return new ObjectResult(new { ErrorCode = "TASK_LABEL_EXISTS", Message = "Relation between task and label already exists." })
                {
                    StatusCode = StatusCodes.Status409Conflict
                };
            }
        
            // Create a new TaskLabel entity
            var taskLabelEntity = new TaskLabel
            {
                TaskId = task.Id,
                LabelId = label.Id,
                UserId = _userService.GetUserId(),
            };

            _context.TaskLabels.Add(taskLabelEntity);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetTaskLabel", new { id = taskLabelEntity.Id }, taskLabelEntity);
        }

        // DELETE: api/TaskLabels/5
        [HttpDelete("tasks/{taskId}/labels/{labelId}")]
        [Authorize]
        public async Task<IActionResult> DeleteTaskLabel(Guid taskId, Guid labelId)
        {
            if (_context.TaskLabels == null)
            {
                return NotFound();
            }

            // Find the taskLabel based on taskId and labelId
            var taskLabel = await _context.TaskLabels
                .FirstOrDefaultAsync(tl => tl.TaskId == taskId && tl.LabelId == labelId);

            if (taskLabel == null)
            {
                return NotFound("TaskLabel not found.");
            }

            _context.TaskLabels.Remove(taskLabel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskLabelExists(Guid id)
        {
            return (_context.TaskLabels?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
