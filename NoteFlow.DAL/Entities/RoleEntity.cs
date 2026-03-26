namespace NoteFlow.DAL.Entities;

public class RoleEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<UserEntity> Users { get; set; } = new List<UserEntity>();
}