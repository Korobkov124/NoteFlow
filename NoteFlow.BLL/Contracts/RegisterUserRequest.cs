using System.ComponentModel.DataAnnotations;

namespace NoteFlow.BLL.Contracts;

public record RegisterUserRequest([Required]string Username, [Required]string Password, [Required]string Email);