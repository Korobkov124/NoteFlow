namespace NoteFlow.BLL.Contracts;

public record FollowResponse(Guid id, Guid senderId, string senderName, string message, DateTime createdAt, bool isRead);