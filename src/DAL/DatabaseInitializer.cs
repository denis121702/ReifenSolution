namespace DAL
{
    using DAL.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using DAL.Core;
    using DAL.Core.Interfaces;

    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly IAccountManager _accountManager;
        private readonly ILogger _logger;

        public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
        {
            _accountManager = accountManager;
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);

            if (!await _context.Users.AnyAsync())
            {
                _logger.LogInformation("Generating inbuilt accounts");

                const string adminRoleName = "administrator";
                const string userRoleName = "user";

                await EnsureRoleAsync(adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
                await EnsureRoleAsync(userRoleName, "Default user", new string[] { });

                await CreateUserAsync("admin", "tempP@ss123", "Inbuilt Administrator", "admin@ebenmonney.com", "+1 (123) 000-0000", new string[] { adminRoleName });
                await CreateUserAsync("user", "tempP@ss123", "Inbuilt Standard User", "user@ebenmonney.com", "+1 (123) 000-0001", new string[] { userRoleName });

                _logger.LogInformation("Inbuilt account generation completed");
            }



            if (!await _context.Customers.AnyAsync()) // && !await _context.ProductCategories.AnyAsync())
            {
                _logger.LogInformation("Seeding initial data");

                var cust_1 = new Customer
                {
                    Name = "Monney",
                    Vorname = "Ebenezer",
                    Street = "Street str.",
                    Hausnummer = "123",
                    PLZ = "54365",
                    Ort = "Leverkusen",
                    Telefon = "0179 299 9981",
                    Email = "info@allreifen.de",
                    Automodell = "MB C-Kl. 200d",
                    Kennzeichen = "K-AJ 7777",
                    Lagerplatz = "F18",
                    Sommer = false,
                    Winter = true,
                    Reifensize = "205 55 R16 91V",
                    Reifenmarke = "Hankook Cept Evo 2",
                    Profiltiefe = "1xkaputt, 3xdurch",
                    Dot = "3215",
                    Felgeninfo = "Orig. 5x112, 66,6,",
                    Schraubensize = "12x 1,5mm",
                    Damagestate = "Gebraucht",
                    Notizenempfehlungen = "Felgenreparatur, Neu Reifen kaufen.",
                    History = "Kunde seit 20.07.2017, Ersteinlagerung 20.07.2018 Sommer, W-einl. 01.11.2018, Sommereinlg. 01.04.2018.",
                    Gender = Gender.Male,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow
                };
                var cust_2 = new Customer
                {
                    Name = "Itachi",
                    Vorname = "Uchiha",
                    Street = "Montanusstr.",
                    Hausnummer = "123",
                    PLZ = "44666",
                    Ort = "Köln",
                    Telefon = "0179 299 9981",
                    Email = "info@allreifen.de",
                    Automodell = "MB C-Kl. 200d",
                    Kennzeichen = "K-AJ 7777",
                    Lagerplatz = "B18",
                    Sommer = false,
                    Winter = true,
                    Reifensize = "205 55 R16 91V",
                    Reifenmarke = "Hankook Cept Evo 2",
                    Profiltiefe = "1xkaputt, 3xdurch",
                    Dot = "3215",
                    Felgeninfo = "Orig. 5x112, 66,6,",
                    Schraubensize = "12x 1,5mm",
                    Damagestate = "Gebraucht",
                    Notizenempfehlungen = "Felgenreparatur, Neu Reifen kaufen.",
                    History = "Kunde seit 20.07.2017, Ersteinlagerung 20.07.2018 Sommer, W-einl. 01.11.2018, Sommereinlg. 01.04.2018.",
                    Gender = Gender.Male,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow
                };
                var cust_3 = new Customer
                {
                    Name = "Doe",
                    Vorname = "John ",
                    Street = "Kndndnde.",
                    Hausnummer = "123",
                    PLZ = "44666",
                    Ort = "Düsseldorf",
                    Telefon = "0179 299 9981",
                    Email = "info@allreifen.de",
                    Automodell = "MB C-Kl. 200d",
                    Kennzeichen = "K-AJ 7777",
                    Lagerplatz = "A18",
                    Sommer = false,
                    Winter = true,
                    Reifensize = "205 55 R16 91V",
                    Reifenmarke = "Hankook Cept Evo 2",
                    Profiltiefe = "1xkaputt, 3xdurch",
                    Dot = "3215",
                    Felgeninfo = "Orig. 5x112, 66,6,",
                    Schraubensize = "12x 1,5mm",
                    Damagestate = "Gebraucht",
                    Notizenempfehlungen = "Felgenreparatur, Neu Reifen kaufen.",
                    History = "Kunde seit 20.07.2017, Ersteinlagerung 20.07.2018 Sommer, W-einl. 01.11.2018, Sommereinlg. 01.04.2018.",
                    Gender = Gender.Male,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow
                };
              
                ProductCategory prodCat_1 = new ProductCategory
                {
                    Name = "None",
                    Description = "Default category. Products that have not been assigned a category",
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };

                Product prod_1 = new Product
                {
                    Name = "BMW M6",
                    Description = "Yet another masterpiece from the world's best car manufacturer",
                    BuyingPrice = 109775,
                    SellingPrice = 114234,
                    UnitsInStock = 12,
                    IsActive = true,
                    ProductCategory = prodCat_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };
                Product prod_2 = new Product
                {
                    Name = "Nissan Patrol",
                    Description = "A true man's choice",
                    BuyingPrice = 78990,
                    SellingPrice = 86990,
                    UnitsInStock = 4,
                    IsActive = true,
                    ProductCategory = prodCat_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow
                };


                Order ordr_1 = new Order
                {
                    Discount = 500,
                    Cashier = await _context.Users.FirstAsync(),
                    Customer = cust_1,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                    OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail() {UnitPrice = prod_1.SellingPrice, Quantity=1, Product = prod_1 },
                        new OrderDetail() {UnitPrice = prod_2.SellingPrice, Quantity=1, Product = prod_2 },
                    }
                };
                Order ordr_2 = new Order
                {
                    Cashier = await _context.Users.FirstAsync(),
                    Customer = cust_2,
                    DateCreated = DateTime.UtcNow,
                    DateModified = DateTime.UtcNow,
                    OrderDetails = new List<OrderDetail>()
                    {
                        new OrderDetail() {UnitPrice = prod_2.SellingPrice, Quantity=1, Product = prod_2 },
                    }
                };


                _context.Customers.Add(cust_1);
                _context.Customers.Add(cust_2);
                _context.Customers.Add(cust_3);                

                _context.Products.Add(prod_1);
                _context.Products.Add(prod_2);

                _context.Orders.Add(ordr_1);
                _context.Orders.Add(ordr_2);

                await _context.SaveChangesAsync();

                _logger.LogInformation("Seeding initial data completed");
            }
        }

        private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
        {
            if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
            {
                ApplicationRole applicationRole = new ApplicationRole(roleName, description);

                var result = await this._accountManager.CreateRoleAsync(applicationRole, claims);

                if (!result.Item1)
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");
            }
        }

        private async Task<ApplicationUser> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
        {
            ApplicationUser applicationUser = new ApplicationUser
            {
                UserName = userName,
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                IsEnabled = true
            };

            var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

            if (!result.Item1)
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");


            return applicationUser;
        }
    }
}
