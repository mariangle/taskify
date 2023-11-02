using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Event
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Location { get; set; }
        public string? Time { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
