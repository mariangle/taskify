namespace server.Models
{
    public class User
    {
        public Guid Id { get; set; } 
        public string Username { get; set; } = string.Empty;
        public string? Image { get; set; }
        public string Name { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public List<Task>? Tasks { get; set; }
        public List<Label>? Labels { get; set; }
    }
}
