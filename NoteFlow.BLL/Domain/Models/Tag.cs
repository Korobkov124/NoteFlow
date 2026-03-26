namespace NoteFlow.BLL.Domain.Models;

public class Tag
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid ColorId { get; set; }
}