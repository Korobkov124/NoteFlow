namespace NoteFlow.DAL.Entities;

public class FriendEntity
{
    public Guid UserId { get; set; }
    public Guid FriendId { get; set; }
    public DateTime CreatedAt { get; set; }

    public UserEntity UserEntity { get; set; } = null!;
    public UserEntity FriendUserEntity { get; set; }
}