using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi;
using Microsoft.EntityFrameworkCore;
using NoteFlow.BLL.DTO;
using NoteFlow.BLL.Interfaces;
using NoteFlow.BLL.Mapping;
using NoteFlow.BLL.Services;
using NoteFlow.DAL.Auth;
using NoteFlow.DAL.Context;
using NoteFlow.DAL.Entities;
using NoteFlow.DAL.Interfaces;
using NoteFlow.DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<PgContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<NoteFlowMappingProfile>();
});

builder.Services.AddScoped<IGenericRepository<User>, GenericRepository<User>>();
builder.Services.AddScoped<IGenericService<UserDto>, GenericService<User, UserDto>>();
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.Configure<JwtOptions>(
    builder.Configuration.GetSection("JwtOptions"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "NoteFlow API",
        Version = "v1",
        Description = "Documentation for NoteFlow API"
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "NoteFlow API");
        c.RoutePrefix = "api/swagger";
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();