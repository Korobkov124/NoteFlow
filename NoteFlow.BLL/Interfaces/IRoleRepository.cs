using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Interfaces;

public interface IRoleRepository : IGenericRepository<Role>
{
    public Task<Role?> GetByNameAsync(string name);
    public Task<Role?> GetByUserIdAsync(Guid id);
}