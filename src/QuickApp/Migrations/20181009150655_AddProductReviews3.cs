using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickApp.Migrations
{
    public partial class AddProductReviews3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SchraubenSize",
                table: "AppCustomers",
                newName: "Schraubensize");

            migrationBuilder.RenameColumn(
                name: "ReifenSize",
                table: "AppCustomers",
                newName: "Reifensize");

            migrationBuilder.RenameColumn(
                name: "ProfilTiefe",
                table: "AppCustomers",
                newName: "Profiltiefe");

            migrationBuilder.RenameColumn(
                name: "NotizenEmpfehlungen",
                table: "AppCustomers",
                newName: "Notizenempfehlungen");

            migrationBuilder.RenameColumn(
                name: "FelgenInfo",
                table: "AppCustomers",
                newName: "Felgeninfo");

            migrationBuilder.RenameColumn(
                name: "DamageState",
                table: "AppCustomers",
                newName: "Damagestate");

            migrationBuilder.RenameColumn(
                name: "DOT",
                table: "AppCustomers",
                newName: "Dot");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "AppCustomers",
                newName: "Telefon");

            migrationBuilder.RenameColumn(
                name: "MarkeModel",
                table: "AppCustomers",
                newName: "Automodell");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Schraubensize",
                table: "AppCustomers",
                newName: "SchraubenSize");

            migrationBuilder.RenameColumn(
                name: "Reifensize",
                table: "AppCustomers",
                newName: "ReifenSize");

            migrationBuilder.RenameColumn(
                name: "Profiltiefe",
                table: "AppCustomers",
                newName: "ProfilTiefe");

            migrationBuilder.RenameColumn(
                name: "Notizenempfehlungen",
                table: "AppCustomers",
                newName: "NotizenEmpfehlungen");

            migrationBuilder.RenameColumn(
                name: "Felgeninfo",
                table: "AppCustomers",
                newName: "FelgenInfo");

            migrationBuilder.RenameColumn(
                name: "Dot",
                table: "AppCustomers",
                newName: "DOT");

            migrationBuilder.RenameColumn(
                name: "Damagestate",
                table: "AppCustomers",
                newName: "DamageState");

            migrationBuilder.RenameColumn(
                name: "Telefon",
                table: "AppCustomers",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "Automodell",
                table: "AppCustomers",
                newName: "MarkeModel");
        }
    }
}
