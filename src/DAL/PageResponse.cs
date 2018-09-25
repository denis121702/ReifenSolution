namespace DAL
{
    using DAL.Models;
    using System.Collections.Generic;

    public class PageResponse
    {
        public IList<Customer> data { get; set; }

        public int totalCount { get; set; }
    }
}
