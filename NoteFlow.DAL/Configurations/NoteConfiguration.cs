using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("notes");
        
        builder.HasKey(n => n.Id);
        
        builder.Property(n => n.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();
        
        builder.Property(n => n.Title)
            .HasColumnName("title")
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(n => n.Content)
            .HasColumnName("content")
            .HasColumnType("text")
            .IsRequired();
        
        builder.Property(n => n.TagId)
            .HasColumnName("tag_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(n => n.UserId)
            .HasColumnName("user_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(n => n.StatusId)
            .HasColumnName("status_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(n => n.CreatedAt)
            .HasColumnName("created_at")
            .HasColumnType("date")
            .IsRequired();
    }
}