namespace NoteFlow.DAL.Entities;

public class NoteEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public Guid TagId { get; set; }
    public Guid UserId { get; set; }
    public Guid StatusId { get; set; }
    public DateTime CreatedAt { get; set; }

    public TagEntity TagEntity { get; set; }
    public StatusEntity StatusEntity { get; set; }
    public UserEntity UserEntity { get; set; }
}