namespace QuickApp.ViewModels
{
    using System.Collections.Generic;

    public class PageResponseViewData
    {
        public IEnumerable<CustomerViewModel> data { get; set; }

        public int totalCount { get; set; }
    }
}
