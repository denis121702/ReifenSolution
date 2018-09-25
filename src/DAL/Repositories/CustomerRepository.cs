namespace DAL.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using DAL.Models;
    using DAL.Repositories.Interfaces;
    using System.Linq.Dynamic;

    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Customer> GetTopActiveCustomers(int count)
        {
            throw new NotImplementedException();
        }


        public IEnumerable<Customer> GetAllCustomersData()
        {
            return _appContext.Customers
                .Include(c => c.Orders).ThenInclude(o => o.OrderDetails).ThenInclude(d => d.Product)
                .Include(c => c.Orders).ThenInclude(o => o.Cashier)
                .OrderBy(c => c.Name)
                .ToList();
        }

        public Task<PageResponse> GetCustomers(PageRequest pageRequest, TransactionalInformation transaction)
        {
            //transaction = new TransactionalInformation();           
            
            if (string.IsNullOrWhiteSpace(pageRequest.sortActive))
            {
                pageRequest.sortActive = "Name";
            }

            if (string.IsNullOrWhiteSpace(pageRequest.sortDirection))
            {
                pageRequest.sortDirection = "ASC";
            }

            var sortExpression = pageRequest.sortActive + " " + pageRequest.sortDirection;

            var customerQuery = _appContext.Customers.AsQueryable();

            //if (customerCode != null && customerCode.Trim().Length > 0)
            //{
            //    customerQuery = customerQuery.Where(c => c.CustomerCode.StartsWith(customerCode));
            //}

            if (!string.IsNullOrWhiteSpace(pageRequest.filter))
            {
                customerQuery = customerQuery.Where(c => c.Name.StartsWith(pageRequest.filter));
            }

            //OrderBy(sortExpression).
            var customers = customerQuery.Skip(pageRequest.startIndex * pageRequest.pageSize).Take(pageRequest.pageSize).ToList();
            
            var pageResponse = new PageResponse
            {
                totalCount = customerQuery.Count(),
                data = customers
            };

            transaction.ReturnStatus = true;

            return Task.FromResult<PageResponse>(pageResponse);
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
