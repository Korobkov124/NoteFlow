namespace NoteFlow.BLL.Domain.Models;

public class Note
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public Guid TagId { get; set; }
    public Guid UserId { get; set; }
    public Guid StatusId { get; set; }
    public DateTime CreatedAt { get; set; }
}