using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Repositories;

public class FriendRepository : GenericRepository<Friend, FriendEntity>, IFriendRepository
{
    private readonly PgContext _context;
    private readonly IMapper _mapper;

    public FriendRepository(PgContext context, IMapper mapper) 
        : base(context, mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> FriendshipExists(Guid userId, Guid friendId)
    {
        return await _context.Friends
            .AnyAsync(x => x.UserId == userId && x.FriendId == friendId);
    }

    public async Task<IEnumerable<Friend>> GetFriendsAsync(Guid userId)
    {
        var entities = await _context.Friends
            .Where(f => f.UserId == userId)
            .ToListAsync();
        
        return _mapper.Map<IEnumerable<Friend>>(entities);
    }
    
}