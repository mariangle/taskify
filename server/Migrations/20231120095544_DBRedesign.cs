using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class DBRedesign : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Subtasks");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Tasks",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Subtasks",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Completed",
                table: "Subtasks",
                newName: "isCompleted");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "Tasks",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<Guid>(
                name: "ListId",
                table: "Tasks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Subtasks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "List",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Emoji = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_List", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ListId",
                table: "Tasks",
                column: "ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_List_ListId",
                table: "Tasks",
                column: "ListId",
                principalTable: "List",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_List_ListId",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "List");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ListId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "ListId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Subtasks");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tasks",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "isCompleted",
                table: "Subtasks",
                newName: "Completed");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Subtasks",
                newName: "Title");

            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Tasks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Subtasks",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
