namespace DAL.Repositories.Interfaces
{
    using DAL.Models;    
    using System.Collections.Generic;    
    using System.Threading.Tasks;

    public interface ICustomerRepository : IRepository<Customer>
    {
        IEnumerable<Customer> GetTopActiveCustomers(int count);

        IEnumerable<Customer> GetAllCustomersData();

        Task<PageResponse> GetCustomers(PageRequest pageRequest, TransactionalInformation transaction);
    }
}
