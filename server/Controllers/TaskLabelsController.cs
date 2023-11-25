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
        /*
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
                    // .Select(tl => tl.Label)
                    .ToList();

                return Ok(labels);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
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
        */
    }
}
