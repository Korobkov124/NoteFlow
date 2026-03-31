using AutoMapper.Configuration.Annotations;
using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.BLL.DTO;
using NoteFlow.BLL.Exceptions;
using NoteFlow.BLL.Interfaces;

namespace NoteFlow.BLL.Services;

public class NoteService
{
    private readonly IGenericRepository<Tag> _tagRepository;
    private readonly INoteRepository _noteRepository;
    private readonly IStatusRepository _statusRepository;
    
    public NoteService(
        IGenericRepository<Tag> tagRepository,
        INoteRepository noteRepository,
        IStatusRepository statusRepository)
    {
        _tagRepository = tagRepository;
        _noteRepository = noteRepository;
        _statusRepository = statusRepository;
    }

    public async Task<Note> GetNoteById(Guid id)
    {
        var note = await _noteRepository.GetByIdAsync(id);
        
        if (note == null)
        {
            throw new NotFoundException("Note with id: " + id + " not found");
        }
        
        return note;
    }

    public async Task CreateNote(CreateNoteRequest model)
    {
        var existingTag = await _tagRepository.GetByIdAsync(model.tagId);

        if (existingTag == null)
        {
            throw new NotFoundException("Tag with id: " + model.tagId + " not found");
        }

        var status = await _statusRepository.GetByName("Published");

        if (status == null)
        {
            throw new NotFoundException("Status with name Published not found");
        }

        var newNote = new Note
        {
            Id = Guid.NewGuid(),
            Title = model.title,
            Content = model.content,
            CreatedAt = DateTime.Now,
            TagId = model.tagId,
            StatusId = status.Id,
            UserId = model.userId,
        };
        
        await _noteRepository.CreateAsync(newNote);
    }

    public async Task DeleteNote(Guid id)
    {
        var existingNote = await _noteRepository.GetByIdAsync(id);

        if (existingNote == null)
        {
            throw new NotFoundException("Note with id: " + id + " not found");
        }
        
        await _noteRepository.DeleteAsync(id);
    }

    public async Task UpdateNote(UpdateNoteRequest model)
    {
        if (model == null || model.noteId == Guid.Empty)
            throw new ArgumentException("Некорректные данные");
        
        var existingNote = await _noteRepository.GetByIdAsync(model.noteId);
        
        if (existingNote == null)
            throw new NotFoundException($"Заметка {model.noteId} не найдена");
        
        existingNote.Title = model.title ?? existingNote.Title;
        existingNote.Content = model.content ?? existingNote.Content;
        existingNote.StatusId = Guid.Parse("77f30231-f457-4d93-a885-088e119ff73f");
        
        await _noteRepository.UpdateAsync(existingNote);
    }

    public async Task<IEnumerable<Note>> GetAllNotes(GetAllNotesRequest model)
    {
        var notes = await _noteRepository.GetAllNotesWithUserIdAsync(model.UserId);
        if (notes == null)
        {
            throw new NotFoundException("Notes not found");
        }
        
        return notes;
    }
}