using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class StatusConfiguration : IEntityTypeConfiguration<StatusEntity>
{
    public void Configure(EntityTypeBuilder<StatusEntity> builder)
    {
        builder.ToTable("statuses");
        
        builder.HasKey(t => t.Id);
        
        builder.Property(t => t.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();
        
        builder.Property(t => t.Name)
            .HasColumnName("name")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.HasMany(t => t.Notes)
            .WithOne(t => t.StatusEntity)
            .HasForeignKey(t => t.StatusId)
            .IsRequired();
    }
}