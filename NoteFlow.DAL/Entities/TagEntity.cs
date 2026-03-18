namespace NoteFlow.DAL.Entities;

public class TagEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid? ColorId { get; set; }
    public ColorEntity? ColorEntity { get; set; }
    public ICollection<NoteEntity> Notes { get; set; } = new List<NoteEntity>();
}