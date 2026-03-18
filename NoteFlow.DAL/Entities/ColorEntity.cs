namespace NoteFlow.DAL.Entities;

public class ColorEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public ICollection<TagEntity> Tags { get; set; } = new List<TagEntity>();
}