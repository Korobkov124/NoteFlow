using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Repositories;

public class RoleRepository : GenericRepository<Role, RoleEntity>, IRoleRepository
{
    private readonly PgContext _pgContext;
    private readonly IMapper _mapper;
    
    public RoleRepository(PgContext pgContext, IMapper mapper) : base(pgContext,  mapper)
    {
        _pgContext = pgContext;
        _mapper = mapper;
    }

    public async Task<Role?> GetByNameAsync(string name)
    {
        var entity = await _pgContext.Roles.FirstOrDefaultAsync(u => u.Name == name);
        
        return _mapper.Map<Role>(entity);
    }

    public async Task<Role?> GetByUserIdAsync(Guid id)
    {
        var entity = await _pgContext.Roles
            .Include(r => r.Users)
            .FirstOrDefaultAsync(r => r.Users.Any(u => u.Id == id));
        
        return _mapper.Map<Role>(entity);
    }
}