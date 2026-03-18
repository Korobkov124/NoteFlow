namespace NoteFlow.BLL.Domain.Models;

public class Friend
{
    public Guid UserId { get; set; }
    public Guid FriendId { get; set; }
    public DateTime CreatedAt { get; set; }
}