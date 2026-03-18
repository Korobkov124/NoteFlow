using Microsoft.AspNetCore.Mvc;
using NoteFlow.BLL.DTO;
using NoteFlow.BLL.Interfaces;
using NoteFlow.BLL.Services;

namespace NoteFlow.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly UsersService _service;
    
    public UserController(UsersService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _service.GetAllAsync();
        return Ok(users);
    }
}