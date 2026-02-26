using System.Linq.Expressions;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Interfaces;

public interface IUsersRepository : IGenericRepository<User>
{
    public Task<User?> GetByEmailAsync(string email);
}