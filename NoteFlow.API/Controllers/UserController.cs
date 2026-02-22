using Microsoft.AspNetCore.Mvc;
using NoteFlow.BLL.DTO;
using NoteFlow.BLL.Interfaces;

namespace NoteFlow.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IGenericService<UserDto> _service;
    
    public UserController(IGenericService<UserDto> service)
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