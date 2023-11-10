namespace IEATodoAPI.Models
{
    public sealed class Todo
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public bool Completed { get; set; } = false;
    }
}
