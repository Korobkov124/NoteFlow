using NoteFlow.BLL.Contracts;
using NoteFlow.DAL.Entities;
using NoteFlow.DAL.Interfaces;

namespace NoteFlow.BLL.Services;

public class UsersService
{
    private readonly IPasswordHasher _passwordHasher;
    private readonly IUsersRepository _usersRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IJwtProvider _jwtProvider;
    
    public UsersService(IPasswordHasher passwordHasher, IUsersRepository  repository, IRoleRepository roleRepository,  IJwtProvider jwtProvider)
    {
        _passwordHasher = passwordHasher;
        _usersRepository = repository;
        _roleRepository = roleRepository;
        _jwtProvider = jwtProvider;
    }

    public async Task Register(RegisterUserRequest model)
    {
        var existingUser = await _usersRepository.GetByEmailAsync(model.Email);
        
        if (existingUser != null)
        {
            throw new Exception($"User with email {model.Email} already exists");
        }
        
        var existingRole = await _roleRepository.GetByNameAsync("User");
        
        var hashedPassword = _passwordHasher.HashPassword(model.Password);

        if (existingRole != null)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = model.Username,
                Email = model.Email,
                Password = hashedPassword,
                RoleId = existingRole.Id
            };
        
            await _usersRepository.CreateAsync(user);
        }
    }

    public async Task<string> Login(LoginUserRequest model)
    {
        var existingUser = await _usersRepository.GetByEmailAsync(model.Email);

        if (existingUser == null)
        {
            throw new Exception("User not found");
        }

        var result = _passwordHasher.VerifyHashedPassword(model.Password, existingUser.Password);

        if (!result)
        {
            throw new Exception("Failed to login");
        }
        
        var token = _jwtProvider.GenerateJwtToken(existingUser);
        return token;
    }
}