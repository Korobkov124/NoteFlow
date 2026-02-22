namespace NoteFlow.DAL.Entities;

public class Color
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();
}