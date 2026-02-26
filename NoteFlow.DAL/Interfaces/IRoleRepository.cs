using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Interfaces;

public interface IRoleRepository : IGenericRepository<Role>
{
    public Task<Role?> GetByNameAsync(string name);
}