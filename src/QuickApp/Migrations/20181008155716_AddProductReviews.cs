using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickApp.Migrations
{
    public partial class AddProductReviews : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lagerplatz",
                table: "AppCustomers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Vorname",
                table: "AppCustomers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lagerplatz",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "Vorname",
                table: "AppCustomers");
        }
    }
}
