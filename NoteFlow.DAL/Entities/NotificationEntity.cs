namespace NoteFlow.DAL.Entities;

public class NotificationEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid SenderId { get; set; }
    public string Type { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public UserEntity User { get; set; } = null!;
    public UserEntity Sender { get; set; } = null!;

}