using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Repositories;


public class UsersRepository : GenericRepository<User, UserEntity>, IUsersRepository
{
    private readonly PgContext _pgContext;
    private readonly IMapper _mapper;

    public UsersRepository(PgContext pgContext, IMapper mapper) : base(pgContext, mapper)
    {
        _pgContext = pgContext;
        _mapper = mapper;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        var entity = await _pgContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        
        return _mapper.Map<User>(entity);
    }
}