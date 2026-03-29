using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Interfaces;

public interface IFriendRepository : IGenericRepository<Friend>
{
    public Task<bool> FriendshipExists(Guid userId, Guid friendId);
    public Task<IEnumerable<Friend>> GetFriendsAsync(Guid userId);
}