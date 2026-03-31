using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Context;

namespace NoteFlow.DAL.Repositories
{
    public class GenericRepository<TDomain, TEntity> : IGenericRepository<TDomain>
        where TEntity : class
    {
        private readonly PgContext _context;
        private readonly IMapper _mapper;
        private readonly DbSet<TEntity> _dbSet;

        public GenericRepository(PgContext context, IMapper mapper) 
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
            _mapper = mapper;
        }

        public async Task<TDomain?> GetByIdAsync(Guid id)
        {
            var entity = await _dbSet.FindAsync(id);
            return _mapper.Map<TDomain>(entity);
        }

        public async Task<IEnumerable<TDomain>> GetAllAsync()
        {
            var entities = await _dbSet.ToListAsync();
            return _mapper.Map<IEnumerable<TDomain>>(entities);
        }

        public async Task CreateAsync(TDomain domain)
        {
            var entity = _mapper.Map<TEntity>(domain);
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TDomain domain)
        {
            var incomingEntity = _mapper.Map<TEntity>(domain);
            var keyProperty = typeof(TEntity).GetProperty("Id") ?? typeof(TEntity).GetProperty("NoteId");
            if (keyProperty == null) throw new Exception("Не найдено свойство первичного ключа 'Id' или 'NoteId'");
            
            var idValue = keyProperty.GetValue(incomingEntity);
            
            var trackedEntity = await _dbSet.FindAsync(idValue);

            if (trackedEntity != null)
            {
                _context.Entry(trackedEntity).CurrentValues.SetValues(incomingEntity);
            }
            else
            {
                _dbSet.Update(incomingEntity);
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}