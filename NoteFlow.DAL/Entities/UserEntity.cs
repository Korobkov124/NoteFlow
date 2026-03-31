namespace NoteFlow.DAL.Entities;

public class UserEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public Guid RoleId { get; set; }
    public string AvatarUrl { get; set; } = string.Empty;

    public RoleEntity RoleEntity { get; set; } = null!;
    public ICollection<NoteEntity> Notes { get; set; } = new List<NoteEntity>();
    public ICollection<FriendEntity> Friends { get; set; } = new List<FriendEntity>();
    public ICollection<FriendEntity> FriendOf { get; set; } = new List<FriendEntity>();
    public ICollection<NotificationEntity> Notifications { get; set; } = new List<NotificationEntity>();
    public ICollection<NotificationEntity> SentNotifications { get; set; } = new List<NotificationEntity>();
}