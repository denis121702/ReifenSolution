namespace QuickApp.ViewModels
{
    using System.Collections.Generic;

    public class PageResponseViewData
    {
        public IEnumerable<CustomerViewModel> Data { get; set; }

        public int TotalCount { get; set; }
    }
}
