namespace NoteFlow.BLL.DTO;

public record UserDto(Guid Id, string Name, string Email, string Password, string AvatarUrl);