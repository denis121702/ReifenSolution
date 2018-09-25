namespace DAL
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class TransactionalInformation
    {
        public bool ReturnStatus { get; set; }
        public List<String> ReturnMessage { get; set; }
        public Hashtable ValidationErrors { get; set; }
    }
}
