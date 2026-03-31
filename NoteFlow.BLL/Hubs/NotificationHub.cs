using Microsoft.AspNetCore.SignalR;

namespace NoteFlow.BLL.Hubs;

public class NotificationHub : Hub
{
    public async Task SubscribeToUser(Guid userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId}");
        Console.WriteLine($"User {userId} subscribed");
    }

    public async Task SendNotificationToUser(Guid userId, object notification)
    {
        await Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", notification);
    }
}