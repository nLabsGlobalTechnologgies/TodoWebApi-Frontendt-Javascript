namespace IEATodoAPI.DTOs
{
    public record UpdateTodoDto(Guid Id, string Title, bool Completed);
}
