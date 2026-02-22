using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class TagConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
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
        
        builder.HasOne(t => t.Color)
            .WithMany(t => t.Tags)
            .HasForeignKey(t => t.ColorId)
            .IsRequired();
        
        builder.HasMany(t => t.Notes)
            .WithOne(t => t.Tag)
            .HasForeignKey(t => t.TagId)
            .IsRequired();
    }
}