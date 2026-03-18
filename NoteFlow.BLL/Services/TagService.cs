using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.Interfaces;

namespace NoteFlow.BLL.Services;

public class TagService
{
    private readonly IGenericRepository<Tag>  _tagRepository;
    
    public TagService(IGenericRepository<Tag> tagRepository)
    {
        _tagRepository = tagRepository;
    }
    
    public async Task<AllTagsResponse> GetAllTags()
    {
        var tags = await _tagRepository.GetAllAsync();
        var response = new AllTagsResponse(tags);
        return response;
    }
}