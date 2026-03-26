namespace NoteFlow.BLL.Interfaces;

public interface IGenericRepository<TDomain>
{
    public Task CreateAsync(TDomain domain);
    public Task UpdateAsync(TDomain domain);
    public Task DeleteAsync(Guid id);
    public Task<TDomain?> GetByIdAsync(Guid id);
    public Task<IEnumerable<TDomain>> GetAllAsync();
}