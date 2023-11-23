namespace server.Models
{
    public class LabelTask
    {
        public Guid Id { get; set; }
        public Guid LabelId { get; set; }
        public Guid TaskId { get; set; }
    }
}
