using Microsoft.AspNetCore.Mvc;
using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Services;

namespace NoteFlow.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UsersService _usersService;

    public AuthController(UsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserRequest model)
    {
        await  _usersService.Register(model);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginUserRequest model)
    {
        await _usersService.Login(model);
        return Ok();
    }
}