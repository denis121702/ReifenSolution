namespace DAL
{
    using DAL.Models;
    using System.Collections.Generic;

    public class PageResponse<TEntity>
    {
        //public IList<Customer> data { get; set; }

        //public int totalCount { get; set; }

        IEnumerable<TEntity> _items;
        int _totalCount;

        public PageResponse(IEnumerable<TEntity> items, int count)
        {
            _items = items;
            _totalCount = count;
        }

        public IEnumerable<TEntity> Data { get { return _items; } }

        public int TotalCount { get { return _totalCount; } }
    }
}
