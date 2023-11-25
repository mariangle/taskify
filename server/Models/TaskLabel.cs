namespace server.Models
{
    public class TaskLabel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid LabelId { get; set; }
        public Guid TaskId { get; set; }
        public Task? Task { get; set; }
        public Label? Label { get; set; }
    }
}
