using System.Linq.Expressions;

namespace NoteFlow.DAL.Interfaces;

public interface IGenericRepository<TEntity> where TEntity : class
{
    public Task CreateAsync(TEntity entity);
    public Task UpdateAsync(TEntity entity);
    public Task DeleteAsync(TEntity entity);
    public Task<TEntity?> GetByIdAsync(Guid id);
    public Task<IEnumerable<TEntity>> GetAllAsync();
    public IQueryable<TEntity> GetQueryable();
}