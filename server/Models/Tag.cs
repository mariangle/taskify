namespace server.Models
{
    public class Tag
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid TaskId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; } 
        public User User { get; set; }
    }
}
