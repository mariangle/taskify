using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Category
    {
        Work,
        Personal,
        Education,
        HealthAndFitness,
        Errands,
        Social,
        Hobbies,
        Travel,
        Finance,
        Urgent,
        DailyRoutine,
        Shopping
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskStatus
    {
        Todo,
        InProgress,
        Completed
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskPriority
    {
        Low,
        Medium,
        High
    }

    public class Task
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Location { get; set; }
        public DateTime DueDate { get; set; }
        public Category? Category { get; set; }
        public TaskPriority? Priority { get; set; }
        public TaskStatus Status { get; set; }
        public User? User { get; set; }
        public List<Subtask>? Subtasks { get; set; }
        public List<Tag>? Tags { get; set; }
        public List<Note>? Notes { get; set; }
        public RecurringTask? Recurring { get; set; }
    }
}
