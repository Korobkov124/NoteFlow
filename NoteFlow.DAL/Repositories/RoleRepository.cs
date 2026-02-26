using Microsoft.EntityFrameworkCore;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;
using NoteFlow.DAL.Interfaces;

namespace NoteFlow.DAL.Repositories;

public class RoleRepository : GenericRepository<Role>, IRoleRepository
{
    private readonly PgContext _pgContext;

    public RoleRepository(PgContext pgContext) : base(pgContext)
    {
        _pgContext = pgContext;
    }

    public async Task<Role?> GetByNameAsync(string name)
    {
        return await _pgContext.Roles.FirstOrDefaultAsync(u => u.Name == name);
    }
}