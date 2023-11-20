namespace server.Models
{
    public class List
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Emoji { get; set; } = string.Empty;
        public List<Task>? Tasks { get; set; }
    }
}
