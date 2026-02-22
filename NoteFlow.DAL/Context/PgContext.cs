using Microsoft.EntityFrameworkCore;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Context;

public sealed class PgContext : DbContext
{
    public PgContext(DbContextOptions<PgContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Status> Statuses { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Friend>  Friends { get; set; }
    public DbSet<Color> Colors { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PgContext).Assembly);
    }
}