using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class TagConfiguration : IEntityTypeConfiguration<TagEntity>
{
    public void Configure(EntityTypeBuilder<TagEntity> builder)
    {
        builder.ToTable("tags");
        
        builder.HasKey(t => t.Id);
        
        builder.Property(t => t.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd()
            .IsRequired();
        
        builder.Property(t => t.Name)
            .HasColumnName("name")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(t => t.ColorId)
            .HasColumnName("fk_color_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.HasOne(t => t.ColorEntity)
            .WithMany(t => t.Tags)
            .HasForeignKey(t => t.ColorId)
            .IsRequired();
        
        builder.HasMany(t => t.Notes)
            .WithOne(t => t.TagEntity)
            .HasForeignKey(t => t.TagId)
            .IsRequired();
    }
}