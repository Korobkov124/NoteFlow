using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddNotificationsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_notes_statuses_fk_status_id",
                table: "notes");

            migrationBuilder.DropForeignKey(
                name: "FK_notes_tags_fk_tag_id",
                table: "notes");

            migrationBuilder.DropForeignKey(
                name: "FK_notes_users_fk_user_id",
                table: "notes");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "users",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "tag_id",
                table: "tags",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "status_id",
                table: "statuses",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "roles",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "fk_user_id",
                table: "notes",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "fk_tag_id",
                table: "notes",
                newName: "tag_id");

            migrationBuilder.RenameColumn(
                name: "fk_status_id",
                table: "notes",
                newName: "status_id");

            migrationBuilder.RenameColumn(
                name: "note_id",
                table: "notes",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_notes_fk_user_id",
                table: "notes",
                newName: "IX_notes_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_notes_fk_tag_id",
                table: "notes",
                newName: "IX_notes_tag_id");

            migrationBuilder.RenameIndex(
                name: "IX_notes_fk_status_id",
                table: "notes",
                newName: "IX_notes_status_id");

            migrationBuilder.RenameColumn(
                name: "color_id",
                table: "colors",
                newName: "id");

            migrationBuilder.AlterColumn<Guid>(
                name: "fk_color_id",
                table: "tags",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_notes_statuses_status_id",
                table: "notes",
                column: "status_id",
                principalTable: "statuses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_notes_tags_tag_id",
                table: "notes",
                column: "tag_id",
                principalTable: "tags",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_notes_users_user_id",
                table: "notes",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
