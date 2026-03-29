using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Exceptions;
using NoteFlow.BLL.Interfaces;

namespace NoteFlow.BLL.Services;

public class FriendService
{
    private readonly IFriendRepository _friendRepository;
    private readonly IUsersRepository _userRepository;
    
    public FriendService(
        IFriendRepository friendRepository,
        IUsersRepository userRepository)
    {
        _friendRepository = friendRepository;
        _userRepository = userRepository;
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