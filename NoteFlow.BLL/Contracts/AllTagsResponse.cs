using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Contracts;

public record AllTagsResponse(IEnumerable<Tag> tags);