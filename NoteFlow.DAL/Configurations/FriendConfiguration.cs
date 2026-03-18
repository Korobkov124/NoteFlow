using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteFlow.DAL.Entities;

namespace NoteFlow.DAL.Configurations;

public class FriendConfiguration : IEntityTypeConfiguration<FriendEntity>
{
    public void Configure(EntityTypeBuilder<FriendEntity> builder)
    {
        builder.ToTable("friends");
        
        builder.HasKey(f => new { f.UserId, f.FriendId });
        
        builder.Property(f => f.UserId)
            .HasColumnName("user_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(f => f.FriendId)
            .HasColumnName("friend_id")
            .HasColumnType("uuid")
            .IsRequired();
        
        builder.Property(f => f.CreatedAt)
            .HasColumnName("created_at")
            .HasColumnType("timestamp")
            .HasDefaultValueSql("now()");
        
        builder.HasOne(f => f.UserEntity)
            .WithMany(u => u.Friends)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(f => f.FriendUserEntity)
            .WithMany(u => u.FriendOf)
            .HasForeignKey(f => f.FriendId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}