using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class NotificationConfiguration : IEntityTypeConfiguration<NotificationEntity>
{
    public void Configure(EntityTypeBuilder<NotificationEntity> builder)
    {
        builder.ToTable("Notifications");
        
        builder.HasKey(n => n.Id);
        
        builder.Property(n => n.Id)
            .HasColumnName("notification_id")
            .HasColumnType("uniqueidentifier")
            .ValueGeneratedOnAdd();
        
        builder.Property(n => n.UserId)
            .HasColumnName("user_id")
            .HasColumnType("uniqueidentifier")
            .IsRequired();
        
        builder.Property(n => n.SenderId)
            .HasColumnName("sender_id")
            .HasColumnType("uniqueidentifier")
            .IsRequired();

        builder.Property(n => n.Type)
            .HasColumnName("type")
            .HasColumnType("varchar(50)")
            .IsRequired();
        
        builder.Property(n => n.Message)
            .HasColumnName("message")
            .HasColumnType("text")
            .IsRequired();
        
        builder.Property(n => n.IsRead)
            .HasColumnName("is_read")
            .HasColumnType("boolean")
            .IsRequired();
        
        builder.Property(n => n.CreatedAt)
            .HasColumnName("created_at")
            .HasColumnType("timestamp")
            .IsRequired();
        
        builder.HasOne(n => n.Sender)
            .WithMany(n => n.SentNotifications)
            .HasForeignKey(n => n.SenderId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(n => n.User)
            .WithMany(n => n.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}