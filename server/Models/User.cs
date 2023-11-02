using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } 
        public string Username { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public List<Event>? Events { get; set; }
    }
}
