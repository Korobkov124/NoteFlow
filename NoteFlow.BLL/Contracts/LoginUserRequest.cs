using System.ComponentModel.DataAnnotations;

namespace NoteFlow.BLL.Contracts;

public record LoginUserRequest([Required]string Email, [Required]string Password);