using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<RoleEntity>
{
    public void Configure(EntityTypeBuilder<RoleEntity> builder)
    {
        builder.ToTable("roles");
        
        builder.HasKey(r => r.Id);
        
        builder.Property(r => r.Id)
            .HasColumnName("role_id")
            .ValueGeneratedOnAdd();
        
        builder.Property(r => r.Name)
            .HasColumnName("name")
            .HasMaxLength(50)
            .IsRequired();
    }
}