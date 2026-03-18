using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class NoteConfiguration : IEntityTypeConfiguration<NoteEntity>
{
    public void Configure(EntityTypeBuilder<NoteEntity> builder)
    {
        builder.ToTable("notes");
        
        builder.HasKey(n => n.Id);
        
        builder.Property(n => n.Id)
            .HasColumnName("note_id")
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
            .HasColumnName("fk_tag_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(n => n.UserId)
            .HasColumnName("fk_user_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(n => n.StatusId)
            .HasColumnName("fk_status_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(n => n.CreatedAt)
            .HasColumnName("created_at")
            .HasColumnType("date")
            .IsRequired();
    }
}