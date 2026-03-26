using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Interfaces;

public interface INoteRepository : IGenericRepository<Note>
{
    Task<IEnumerable<Note>> GetAllNotesWithUserIdAsync(Guid userId);
}