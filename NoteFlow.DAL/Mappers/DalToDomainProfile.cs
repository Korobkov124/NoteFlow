using AutoMapper;
using NoteFlow.BLL.Domain.Models;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Mappers;

public class DalToDomainProfile : Profile
{
    public  DalToDomainProfile()
    {
        CreateMap<User, UserEntity>();
        CreateMap<UserEntity, User>();

        CreateMap<ColorEntity, Color>();
        CreateMap<Color, ColorEntity>();
        
        CreateMap<NoteEntity, Note>();
        CreateMap<Note, NoteEntity>();

        CreateMap<Friend, FriendEntity>();
        CreateMap<FriendEntity, Friend>();

        CreateMap<Tag, TagEntity>();
        CreateMap<TagEntity, Tag>();
        
        CreateMap<Role, RoleEntity>();
        CreateMap<RoleEntity, Role>();

        CreateMap<Status, StatusEntity>();
        CreateMap<StatusEntity, Status>();
    }
}