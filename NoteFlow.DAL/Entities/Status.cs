namespace NoteFlow.DAL.Entities;

public class Status
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public ICollection<Note> Notes { get; set; } = new List<Note>();
}