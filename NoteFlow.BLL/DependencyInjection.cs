using Microsoft.Extensions.DependencyInjection;
using NoteFlow.BLL.Services;

namespace NoteFlow.BLL;

public static class DependencyInjection
{
    public static IServiceCollection AddBLL(this IServiceCollection services)
    {
        services.AddScoped<UsersService>();
        
        return services;
    }
}