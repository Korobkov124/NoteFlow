using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Repositories;

public class NoteRepository : GenericRepository<Note, NoteEntity>, INoteRepository
{
    private readonly PgContext _context;
    private readonly IMapper _mapper;

    public NoteRepository(PgContext context, IMapper mapper) : base(context, mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<Note>> GetAllNotesWithUserIdAsync(Guid userId)
    {
        var entities = await _context.Notes
            .Where(n => n.UserId == userId)
            .ToListAsync();
        
        return _mapper.Map<IEnumerable<Note>>(entities);
    }
}