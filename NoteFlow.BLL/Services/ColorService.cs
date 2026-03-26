using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;

namespace NoteFlow.BLL.Services;

public class ColorService
{
    private readonly IGenericRepository<Color> _repository;
    
    public  ColorService(IGenericRepository<Color> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Color>> GetAll()
    {
        return await _repository.GetAllAsync();
    }
}