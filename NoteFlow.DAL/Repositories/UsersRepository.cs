using Microsoft.EntityFrameworkCore;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;
using NoteFlow.DAL.Interfaces;

namespace NoteFlow.DAL.Repositories;

public class UsersRepository : GenericRepository<User>, IUsersRepository
{
    private readonly PgContext _pgContext;

    public UsersRepository(PgContext pgContext) : base(pgContext)
    {
        _pgContext = pgContext;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _pgContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}