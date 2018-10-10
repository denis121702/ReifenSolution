namespace QuickApp.ViewModels
{
    using DAL.Core;
    using FluentValidation;
    using System;

    public class CustomerViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Vorname { get; set; }

        public string Street { get; set; }

        public string Hausnummer { get; set; }

        public string PLZ { get; set; }

        public string Ort { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string MarkeModel { get; set; }

        public string Kennzeichen { get; set; }

        public string Lagerplatz { get; set; }

        public bool Sommer { get; set; }

        public bool Winter { get; set; }

        public string ReifenSize { get; set; }

        public string Reifenmarke { get; set; }

        public string ProfilTiefe { get; set; }

        public string DOT { get; set; }

        public string FelgenInfo { get; set; }

        public string SchraubenSize { get; set; }

        public string DamageState { get; set; }

        public string NotizenEmpfehlungen { get; set; }

        public string History { get; set; }

        public Gender Gender { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        //public ICollection<OrderViewModel> Orders { get; set; }
    }


    public class CustomerViewModelValidator : AbstractValidator<CustomerViewModel>
    {
        public CustomerViewModelValidator()
        {
            RuleFor(register => register.Name).NotEmpty().WithMessage("Customer name cannot be empty");
            RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
