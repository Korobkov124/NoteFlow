using NoteFlow.BLL.Contracts;
using NoteFlow.BLL.Exceptions;
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
            throw new UserAlreadyExistException("User with that email already exists");
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
            throw new NotFoundException("User with that email does not exist");
        }

        var result = _passwordHasher.VerifyHashedPassword(model.Password, existingUser.Password);

        if (!result)
        {
            throw new AuthentificationException("Invalid login attempt");
        }
        
        var token = _jwtProvider.GenerateJwtToken(existingUser);
        return token;
    }
}