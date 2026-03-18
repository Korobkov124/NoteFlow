using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Interfaces;

public interface IUsersRepository : IGenericRepository<User>
{
    public Task<User?> GetByEmailAsync(string email);
}