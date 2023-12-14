namespace server.Models
{
    public class Subtask
    {
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool isCompleted { get; set; } = false;
    }
}
