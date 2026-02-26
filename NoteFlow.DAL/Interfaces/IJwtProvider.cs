using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Interfaces;

public interface IJwtProvider
{
    public string GenerateJwtToken(User user);
}