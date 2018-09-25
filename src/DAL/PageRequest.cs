namespace DAL
{
    public class PageRequest
    {
        public int startIndex { get; set; }
        public int pageSize { get; set; }
        public string sortActive { get; set; }
        public string sortDirection { get; set; }
        public string filter { get; set; }        
    }
}
