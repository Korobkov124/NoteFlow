using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NoteFlow.BLL.Interfaces;
using NoteFlow.DAL.Auth;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Repositories;

namespace NoteFlow.DAL;

public static class DependencyInjection
{
    public static IServiceCollection AddDAL(this IServiceCollection services, string? connectionString)
    {
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new ArgumentException("Connection string 'DefaultConnection' is not configured.", nameof(connectionString));
        }

        services.AddDbContext<PgContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepositoryAdapter<>));

        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<IUsersRepository, UsersRepository>();
        services.AddScoped<IStatusRepository, StatusRepository>();
        services.AddScoped<INoteRepository, NoteRepository>();
        services.AddScoped<IFriendRepository, FriendRepository>();
        
        services.AddScoped<IJwtProvider, JwtProvider>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        
        return services;
    }
}