namespace DAL.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using DAL.Models;
    using DAL.Repositories.Interfaces;
    using System.Linq.Expressions;

    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Customer> GetTopActiveCustomers(int count)
        {
            throw new NotImplementedException();
        }


        public void UpdateCustomer(Customer customer)
        {
            this.Update(customer);            
        }

        //public Customer GetCustomerById(int id)
        //{
        //    var customer = this.Get(id);

        //    return customer;
        //}

        public IEnumerable<Customer> GetAllCustomersData()
        {
            return _appContext.Customers
                //.Include(c => c.Orders).ThenInclude(o => o.OrderDetails).ThenInclude(d => d.Product)
                //.Include(c => c.Orders).ThenInclude(o => o.Cashier)
                .OrderBy(c => c.Name)
                .ToList();
        }

        public PageResponse<Customer> GetCustomers(PageRequest pageRequest)
        {
            if(pageRequest == null)
            {
                throw new ArgumentException("pageRequest");
            }

            var filterExpressions = new List<Expression<Func<Customer, bool>>>();

            if (!string.IsNullOrWhiteSpace(pageRequest.filter))
            {
                filterExpressions.Add(x => x.Name.Contains(pageRequest.filter));
                filterExpressions.Add(x => x.Vorname.Contains(pageRequest.filter));
            }

            var triple = this.ListWithPaging(filterExpressions.ToArray(), 
                pageRequest.startIndex, pageRequest.pageSize, pageRequest.sortActive, pageRequest.sortDirection);
                                 
            var pageResponse = new PageResponse<Customer>(triple.Item1, triple.Item2);
            
            return pageResponse;
        }   

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
