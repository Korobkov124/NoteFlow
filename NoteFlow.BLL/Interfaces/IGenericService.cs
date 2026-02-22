using System.Linq.Expressions;

namespace NoteFlow.BLL.Interfaces;

public interface IGenericService<TDto>
{
    Task CreateAsync(TDto dto);
    Task UpdateAsync(TDto dto);
    Task DeleteByIdAsync(Guid id);
    Task<TDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<TDto>> GetAllAsync();
    Task<IEnumerable<TDto>> GetAllAsync(Func<IQueryable<TDto>, IQueryable<TDto>> queryBuilder);
}