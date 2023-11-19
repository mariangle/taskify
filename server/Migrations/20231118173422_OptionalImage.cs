using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class OptionalImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecurringTask_Task_TaskId",
                table: "RecurringTask");

            migrationBuilder.DropForeignKey(
                name: "FK_Subtask_Task_TaskId",
                table: "Subtask");

            migrationBuilder.DropForeignKey(
                name: "FK_Task_Users_UserId",
                table: "Task");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Task",
                table: "Task");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subtask",
                table: "Subtask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecurringTask",
                table: "RecurringTask");

            migrationBuilder.RenameTable(
                name: "Task",
                newName: "Tasks");

            migrationBuilder.RenameTable(
                name: "Subtask",
                newName: "Subtasks");

            migrationBuilder.RenameTable(
                name: "RecurringTask",
                newName: "RecurringTasks");

            migrationBuilder.RenameIndex(
                name: "IX_Task_UserId",
                table: "Tasks",
                newName: "IX_Tasks_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Subtask_TaskId",
                table: "Subtasks",
                newName: "IX_Subtasks_TaskId");

            migrationBuilder.RenameIndex(
                name: "IX_RecurringTask_TaskId",
                table: "RecurringTasks",
                newName: "IX_RecurringTasks_TaskId");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subtasks",
                table: "Subtasks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecurringTasks",
                table: "RecurringTasks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecurringTasks_Tasks_TaskId",
                table: "RecurringTasks",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subtasks_Tasks_TaskId",
                table: "Subtasks",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_UserId",
                table: "Tasks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecurringTasks_Tasks_TaskId",
                table: "RecurringTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Subtasks_Tasks_TaskId",
                table: "Subtasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Users_UserId",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subtasks",
                table: "Subtasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecurringTasks",
                table: "RecurringTasks");

            migrationBuilder.RenameTable(
                name: "Tasks",
                newName: "Task");

            migrationBuilder.RenameTable(
                name: "Subtasks",
                newName: "Subtask");

            migrationBuilder.RenameTable(
                name: "RecurringTasks",
                newName: "RecurringTask");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_UserId",
                table: "Task",
                newName: "IX_Task_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Subtasks_TaskId",
                table: "Subtask",
                newName: "IX_Subtask_TaskId");

            migrationBuilder.RenameIndex(
                name: "IX_RecurringTasks_TaskId",
                table: "RecurringTask",
                newName: "IX_RecurringTask_TaskId");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Task",
                table: "Task",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subtask",
                table: "Subtask",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecurringTask",
                table: "RecurringTask",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RecurringTask_Task_TaskId",
                table: "RecurringTask",
                column: "TaskId",
                principalTable: "Task",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subtask_Task_TaskId",
                table: "Subtask",
                column: "TaskId",
                principalTable: "Task",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Task_Users_UserId",
                table: "Task",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
