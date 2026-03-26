namespace NoteFlow.BLL.Contracts;

public record AddFriendshipRequest(Guid UserId, Guid FriendId);