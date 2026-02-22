namespace NoteFlow.DAL.Entities;

public class Tag
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid ColorId { get; set; }

    public Color Color { get; set; } = null!;
    public ICollection<Note> Notes { get; set; } = new List<Note>();
}