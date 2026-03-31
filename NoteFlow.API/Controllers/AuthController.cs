using Microsoft.AspNetCore.Mvc;
using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Services;

namespace NoteFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
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
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Login(LoginUserRequest model)
    {
        var token = await _usersService.Login(model);
        return Ok(token);
    }
}