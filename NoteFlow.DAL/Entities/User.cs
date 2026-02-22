namespace NoteFlow.DAL.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public Guid RoleId { get; set; }
    public string AvatarUrl { get; set; } = string.Empty;

    public Role Role { get; set; } = null!;
    public ICollection<Note> Notes { get; set; } = new List<Note>();
    public ICollection<Friend> Friends { get; set; } = new List<Friend>();
    public ICollection<Friend> FriendOf { get; set; } = new List<Friend>();
}