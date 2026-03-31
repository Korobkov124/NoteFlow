using Microsoft.AspNetCore.SignalR;
using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Exceptions;
using NoteFlow.BLL.Hubs;
using NoteFlow.BLL.Interfaces;

namespace NoteFlow.BLL.Services;

public class FriendService
{
    private readonly IFriendRepository _friendRepository;
    private readonly IUsersRepository _userRepository;
    private readonly IHubContext<NotificationHub> _hubContext;
    private readonly INotificationRepository _notificationRepository;
    
    public FriendService(
        IFriendRepository friendRepository,
        IUsersRepository userRepository,
        IHubContext<NotificationHub> hubContext,
        INotificationRepository notificationRepository)
    {
        _friendRepository = friendRepository;
        _userRepository = userRepository;
        _hubContext = hubContext;
        _notificationRepository = notificationRepository;
    }

    public async Task Follow(AddFriendshipRequest model)
    {
        if (model.UserId == model.FriendId)
            throw new BusinessException("Нельзя подписаться на себя");

        var user = await _userRepository.GetByIdAsync(model.UserId);
        var friend = await _userRepository.GetByIdAsync(model.FriendId);

        if (user == null || friend == null)
            throw new NotFoundException("Пользователь не найден");

        var exists = await _friendRepository.FriendshipExists(model.UserId, model.FriendId);

        if (exists)
            throw new BusinessException("Вы уже подписаны");

        var entity = new Friend
        {
            UserId = model.UserId,
            FriendId = model.FriendId,
            CreatedAt = DateTime.Now
        };

        await _friendRepository.CreateAsync(entity);

        var notification = new Notification
        {
            Id = Guid.NewGuid(),
            UserId = model.FriendId,
            SenderId = model.UserId,
            Type = "SUBSCRIPTION",
            Message = "подписался на вас!",
            IsRead = false,
            CreatedAt = DateTime.Now
        };
        
        var response = new FollowResponse(
            notification.Id,
            user.Id,
            user.Name,
            notification.Message,
            notification.CreatedAt,
            notification.IsRead
        );
        
        await _notificationRepository.CreateAsync(notification); 
        
        await _hubContext.Clients.Group($"user_{model.FriendId}").SendAsync("ReceiveNotification", response);
    }

    public async Task<IEnumerable<Friend>> GetFriendsAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            throw new NotFoundException($"User with id {userId} not found");
        }
        var friends = _friendRepository.GetFriendsAsync(userId);

        return await friends;
    }
}