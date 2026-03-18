using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Interfaces;

public interface IStatusRepository : IGenericRepository<Status>
{
    Task<Status?> GetByName(string name);
}