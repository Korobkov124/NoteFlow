using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Repositories;

public class StatusRepository : GenericRepository<Status, StatusEntity>, IStatusRepository
{
    private readonly PgContext _context;
    private readonly IMapper _mapper;

    public StatusRepository(PgContext context, IMapper mapper) : base(context, mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<Status?> GetByName(string name)
    {
        var entity = await _context.Statuses.FirstOrDefaultAsync(s => s.Name == name);
        return _mapper.Map<Status>(entity);
    }
}