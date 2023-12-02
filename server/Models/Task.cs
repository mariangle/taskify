using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{

    public class Task
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? ListId { get; set; }
        public Guid? ProjectId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Note { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public TimeSpan? Duration { get; set; }
        public Priority? Priority { get; set; }
        public Status Status { get; set; }
        public List? List { get; set; }
        public User? User { get; set; }
        public List<Subtask>? Subtasks { get; set; }
        public List<Label>? Labels { get; set; }
        public RecurringTask? Recurring { get; set; }
        public Project? Project { get; set; }

    }
}
