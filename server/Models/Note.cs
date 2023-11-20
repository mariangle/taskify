namespace server.Models
{
    public class Note
    {
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public Guid UserId { get; set; }

        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
