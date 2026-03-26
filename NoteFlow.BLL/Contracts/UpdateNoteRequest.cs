namespace NoteFlow.BLL.Contracts;

public record UpdateNoteRequest(Guid noteId, string title, string content, Guid statusId, Guid tagId);