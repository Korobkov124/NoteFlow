using NoteFlow.DAL.Entities;
using AutoMapper;
using NoteFlow.BLL.DTO;

namespace NoteFlow.BLL.Mapping;

public class NoteFlowMappingProfile : Profile
{
    public NoteFlowMappingProfile()
    {
        CreateMap<Color, ColorDto>().ReverseMap();
        CreateMap<Note, NoteDto>().ReverseMap();
        CreateMap<Status, StatusDto>().ReverseMap();
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Tag, TagDto>().ReverseMap();
        CreateMap<Role, RoleDto>().ReverseMap();
        CreateMap<Friend, FriendDto>().ReverseMap();
    }
}