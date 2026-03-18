using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Services;

namespace NoteFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NoteController : ControllerBase
{
    private readonly NoteService _service;

    public NoteController(NoteService service)
    {
        _service = service;
    }

    [HttpPost("add")]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<CreateNoteRequest>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> CreateNote(CreateNoteRequest request)
    {
        await _service.CreateNote(request);
        return Ok();
    }
    
    [HttpDelete("delete/{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> DeleteNote(
        [FromRoute] Guid id)
    {
        await _service.DeleteNote(id);
        return NoContent();
    }

    [HttpPatch("update/{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateNote(
        [FromRoute] Guid id,
        [FromBody] UpdateNoteRequest request)
    {
        await _service.UpdateNote(request);
        return Ok();
    }
}