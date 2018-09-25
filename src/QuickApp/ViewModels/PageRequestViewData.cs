using System;
using System.ComponentModel.DataAnnotations;

namespace QuickApp.ViewModels
{
    [Serializable]
    public class PageRequestViewData
    {
        [Required]
        public int startIndex { get; set; }

        [Required]
        public int pageSize { get; set; }

        public string sortActive { get; set; }

        public string sortDirection { get; set; }

        public string filter { get; set; }        
    }
}
