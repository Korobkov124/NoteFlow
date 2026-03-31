using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;

namespace NoteFlow.BLL.Services;

public class NotificationService
{
    private readonly INotificationRepository _notificationRepository;
    
    public NotificationService(INotificationRepository notificationRepository)
    {
        _notificationRepository = notificationRepository;
    }

    public async Task<IEnumerable<Notification>> GetAllByUserId(Guid userId)
    {
        return await _notificationRepository.GetAllByUserId(userId);
    }

    public async Task MarkAllReadByUserId(Guid userId)
    {
        await _notificationRepository.MarkAllAsReadAsync(userId);
    }

    public async Task<int> GetUnreadCountByUserId(Guid userId)
    {
        return await _notificationRepository.GetUnreadCountAsync(userId);
    }
}