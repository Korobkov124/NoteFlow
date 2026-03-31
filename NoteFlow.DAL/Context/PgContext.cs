using Microsoft.EntityFrameworkCore;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Context;

public sealed class PgContext : DbContext
{
    public PgContext(DbContextOptions<PgContext> options) : base(options) { }
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<NoteEntity> Notes { get; set; }
    public DbSet<TagEntity> Tags { get; set; }
    public DbSet<StatusEntity> Statuses { get; set; }
    public DbSet<RoleEntity> Roles { get; set; }
    public DbSet<FriendEntity>  Friends { get; set; }
    public DbSet<ColorEntity> Colors { get; set; }
    public DbSet<NotificationEntity> Notifications { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PgContext).Assembly);
    }
}