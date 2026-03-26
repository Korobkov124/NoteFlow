namespace NoteFlow.BLL.Contracts;

public record CreateNoteRequest(string title, string content, Guid tagId, Guid userId);