using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Interfaces;

public interface INotificationRepository : IGenericRepository<Notification>
{
    public Task<IEnumerable<Notification>> GetAllByUserId(Guid userId);
    Task MarkAllAsReadAsync(Guid userId);
    Task<int> GetUnreadCountAsync(Guid userId);
}