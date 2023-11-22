using System.ComponentModel.DataAnnotations;

namespace server.Models
{

    public class Task
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? ListId { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public TimeSpan? Duration { get; set; }
        public Priority? Priority { get; set; }
        public Status Status { get; set; }
        public List? List { get; set; }
        public User? User { get; set; }
        public List<Subtask>? Subtasks { get; set; }
        public List<Note>? Notes { get; set; }
        public RecurringTask? Recurring { get; set; }
    }
}
