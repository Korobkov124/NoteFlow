using NoteFlow.BLL.Domain.Models;

namespace NoteFlow.BLL.Interfaces;

public interface IJwtProvider
{
    public string GenerateJwtToken(User user, string role);
}