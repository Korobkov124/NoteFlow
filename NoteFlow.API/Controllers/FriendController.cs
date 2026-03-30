using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Services;

namespace NoteFlow.Controllers;

[ApiController]
[Route("[controller]")]
public class FriendController : ControllerBase
{
    private readonly FriendService _service;

    public FriendController(FriendService service)
    {
        _service = service;
    }

    [HttpGet("all")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAll(
        [FromRoute] Guid userId)
    {
        var response = await _service.GetFriendsAsync(userId);
        return Ok(response);
    }

    [HttpPost("add")]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<AddFriendshipRequest>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> AddFriend(AddFriendshipRequest request)
    {
        await _service.Follow(request);
        return Ok();
    }
}