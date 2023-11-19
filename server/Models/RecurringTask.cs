using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class RecurringTask
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public string Frequency { get; set; }
        public int? Interval { get; set; } 
    }
}
