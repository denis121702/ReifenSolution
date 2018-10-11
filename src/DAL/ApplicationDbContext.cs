namespace DAL
{
    using DAL.Models;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Threading;
    using DAL.Models.Interfaces;
    using System.ComponentModel.DataAnnotations;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public string CurrentUserId { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Customer>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Customer>().HasIndex(c => c.Name);
            builder.Entity<Customer>().Property(c => c.Vorname).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Street).HasMaxLength(50);
            builder.Entity<Customer>().Property(c => c.Hausnummer).IsUnicode(false).HasMaxLength(30);
            builder.Entity<Customer>().Property(c => c.PLZ).HasMaxLength(50);
            builder.Entity<Customer>().Property(c => c.Ort).HasMaxLength(50);
            builder.Entity<Customer>().Property(c => c.Telefon).IsUnicode(false).HasMaxLength(30);
            builder.Entity<Customer>().Property(c => c.Email).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Automodell).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Kennzeichen).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Lagerplatz).HasMaxLength(10);
            builder.Entity<Customer>().Property(c => c.Reifensize).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Reifenmarke).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Profiltiefe).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Dot).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Schraubensize).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.Damagestate).HasMaxLength(100);            
            builder.Entity<Customer>().ToTable($"App{nameof(this.Customers)}");

            builder.Entity<ProductCategory>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<ProductCategory>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<ProductCategory>().ToTable($"App{nameof(this.ProductCategories)}");

            builder.Entity<Product>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Product>().HasIndex(p => p.Name);
            builder.Entity<Product>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<Product>().Property(p => p.Icon).IsUnicode(false).HasMaxLength(256);
            builder.Entity<Product>().HasOne(p => p.Parent).WithMany(p => p.Children).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Product>().ToTable($"App{nameof(this.Products)}");

            builder.Entity<Order>().Property(o => o.Comments).HasMaxLength(500);
            builder.Entity<Order>().ToTable($"App{nameof(this.Orders)}");

            builder.Entity<OrderDetail>().ToTable($"App{nameof(this.OrderDetails)}");
        }

        public override int SaveChanges()
        {
            UpdateAuditEntities();

            var entities = from e in ChangeTracker.Entries()
                           where e.State == EntityState.Added
                               || e.State == EntityState.Modified
                           select e.Entity;
            foreach (var entity in entities)
            {
                var validationContext = new ValidationContext(entity);
                Validator.ValidateObject(entity, validationContext);
            }

            //var validationErrors = ChangeTracker
            //   .Entries<IValidatableObject>()
            //   .SelectMany(e => e.Entity.Validate(null))
            //   .Where(r => r != ValidationResult.Success);

            //if (validationErrors.Any())
            //{
            //    // Possibly throw an exception here
            //}

            //try
            //{
            return base.SaveChanges();
            //}
            //catch (DbEntityValidationException dbEx)
            //{
            //    // Iterate over the errors and write the trace information to make it a little easier to debug
            //    // We coudl also wrap this up with our RuleException for any modeldb issues that we don't catch with our 
            //    // domain rules.
            //    foreach (var validationErrors in dbEx.EntityValidationErrors)
            //    {
            //        foreach (var validationError in validationErrors.ValidationErrors)
            //        {
            //            Trace.TraceInformation("Property: {0}, Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
            //        }
            //    }

            //    throw;
            //}
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }


        private void UpdateAuditEntities()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));


            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;
                DateTime now = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = CurrentUserId;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = CurrentUserId;
            }
        }
    }
}
