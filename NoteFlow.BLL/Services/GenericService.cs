using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Interfaces;

namespace NoteFlow.BLL.Services;

public class GenericService<TEntity, TDto> : IGenericService<TDto>
    where TEntity : class
    where TDto : class
{
    private readonly IMapper _mapper;
    private readonly IGenericRepository<TEntity> _repository;

    public GenericService(IMapper mapper, IGenericRepository<TEntity> repository)
    {
        _mapper = mapper;
        _repository = repository;
    }

    public async Task CreateAsync(TDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        await _repository.CreateAsync(entity);
    }

    public async Task UpdateAsync(TDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        await _repository.UpdateAsync(entity);
    }
    
    public async Task DeleteByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
        {
            throw new KeyNotFoundException();
        }
        await _repository.DeleteAsync(entity);
    }

    public async Task<TDto?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? throw new KeyNotFoundException() : _mapper.Map<TDto>(entity);
    }
    
    public async Task<IEnumerable<TDto>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<TDto>>(entities);
    }

    public async Task<IEnumerable<TDto>> GetAllAsync(Func<IQueryable<TDto>, IQueryable<TDto>> queryBuilder)
    {
        var query = _repository
            .GetQueryable()
            .ProjectTo<TDto>(_mapper.ConfigurationProvider);

        query = queryBuilder(query);

        return await query.ToListAsync();
    }
}