namespace DAL.Models
{
    using DAL.Core;
    
    public class Customer : AuditableEntity
    {
        public int Id { get; set; }        

        public string Name { get; set; }

        public string Vorname { get; set; }

        public string Street { get; set; }

        public string Hausnummer { get; set; }

        public string PLZ { get; set; }

        public string Ort { get; set; }

        public string Telefon { get; set; }

        public string Email { get; set; }

        public string Automodell { get; set; }

        public string Kennzeichen { get; set; }

        public string Lagerplatz { get; set; }

        public bool Sommer { get; set; }

        public bool Winter { get; set; }

        public string Reifensize { get; set; }

        public string Reifenmarke { get; set; }

        public string Profiltiefe { get; set; }

        public string Dot { get; set; }

        public string Felgeninfo { get; set; }

        public string Schraubensize { get; set; }

        public string Damagestate { get; set; }

        public string Notizenempfehlungen { get; set; }

        public string History { get; set; }

        public Gender Gender { get; set; }

        //public DateTime DateCreated { get; set; }

        //public DateTime DateModified { get; set; }

        //public ICollection<Order> Orders { get; set; }
    }
}
