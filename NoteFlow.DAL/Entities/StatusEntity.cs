namespace NoteFlow.DAL.Entities;

public class StatusEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public ICollection<NoteEntity> Notes { get; set; } = new List<NoteEntity>();
}