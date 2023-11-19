namespace server.Models
{
    public class Note
    {
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
