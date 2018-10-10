using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickApp.Migrations
{
    public partial class AddProductReviews2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "City",
                table: "AppCustomers",
                newName: "Street");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "AppCustomers",
                newName: "NotizenEmpfehlungen");

            migrationBuilder.AlterColumn<string>(
                name: "Vorname",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Lagerplatz",
                table: "AppCustomers",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DOT",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DamageState",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FelgenInfo",
                table: "AppCustomers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hausnummer",
                table: "AppCustomers",
                unicode: false,
                maxLength: 30,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "History",
                table: "AppCustomers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Kennzeichen",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MarkeModel",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ort",
                table: "AppCustomers",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PLZ",
                table: "AppCustomers",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilTiefe",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReifenSize",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Reifenmarke",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SchraubenSize",
                table: "AppCustomers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Sommer",
                table: "AppCustomers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Winter",
                table: "AppCustomers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DOT",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "DamageState",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "FelgenInfo",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "Hausnummer",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "History",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "Kennzeichen",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "MarkeModel",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "Ort",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "PLZ",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "ProfilTiefe",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "ReifenSize",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "Reifenmarke",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "SchraubenSize",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "Sommer",
                table: "AppCustomers");

            migrationBuilder.DropColumn(
                name: "Winter",
                table: "AppCustomers");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "AppCustomers",
                newName: "City");

            migrationBuilder.RenameColumn(
                name: "NotizenEmpfehlungen",
                table: "AppCustomers",
                newName: "Address");

            migrationBuilder.AlterColumn<string>(
                name: "Vorname",
                table: "AppCustomers",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Lagerplatz",
                table: "AppCustomers",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 10,
                oldNullable: true);
        }
    }
}
