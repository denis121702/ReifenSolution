namespace QuickApp.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using DAL;
    using QuickApp.ViewModels;
    using AutoMapper;
    using Microsoft.Extensions.Logging;
    using QuickApp.Helpers;
    using DAL.Models;

    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailSender _emailer;


        public CustomerController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailSender emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }   

        [HttpPost]        
        [ProducesResponseType(201, Type = typeof(RoleViewModel))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerViewModel customerViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);                              
            }

            if (customerViewModel == null)
            { 
                return BadRequest($"{nameof(customerViewModel)} cannot be null");
            }


            var customer = Mapper.Map<Customer>(customerViewModel);

            _unitOfWork.Customers.Add(customer);
            _unitOfWork.SaveChanges();

            return Ok(await Task.FromResult(customer.Id));
        }


        [HttpPut("{id}")]        
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CustomerViewModel customerViewModel)
        {
            _logger.LogInformation("Calling CustomerControlle: UpdateCustomer: " + id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);                
            }

            if (customerViewModel == null)
            {
                return BadRequest($"{nameof(customerViewModel)} cannot be null");
            }

            if (customerViewModel.Id != 0 && id != customerViewModel.Id)
            {
                return BadRequest("Conflicting Customer id in parameter and model data");
            }

            var customer = _unitOfWork.Customers.Get(id);
            if (customer == null)
            {
                return NotFound(id);
            }

            Mapper.Map<CustomerViewModel, Customer>(customerViewModel, customer);

            _unitOfWork.Customers.Update(customer);
            _unitOfWork.SaveChanges();

            return Ok(await Task.FromResult(id));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(RoleViewModel))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            _logger.LogInformation("Calling CustomerControlle: GetCustomerById: " + id);

            var customer = _unitOfWork.Customers.Get(id);            
            
            if (customer == null)
            { 
                return NotFound(id);
            }

            return Ok(await Task.FromResult(customer));
        }



        [Route("search")]
        [ProducesResponseType(200, Type = typeof(PageResponseViewData))]
        [HttpPost]
        public async Task<IActionResult> GetCustomers([FromBody] PageRequestViewData pageRequestViewData)
        {
            _logger.LogInformation("Calling CustomerControlle: GetCustomers");

            var pageRequest = Mapper.Map<PageRequest>(pageRequestViewData);

            //TransactionalInformation transaction = new TransactionalInformation();

            var pageResponse = _unitOfWork.Customers.GetCustomers(pageRequest);
            //if (transaction.ReturnStatus == false)
            //{
            //    return BadRequest("Please check your imput parametrs");                
            //}

            var pageResponseViewData = Mapper.Map<PageResponseViewData>(pageResponse);                        

            return Ok(await Task.FromResult(pageResponse));
        }


        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            _logger.LogInformation("Calling CustomerControlle: GetCustomrts");
            var allCustomers = _unitOfWork.Customers.GetAllCustomersData();

            var mapCustomers = Mapper.Map<IEnumerable<CustomerViewModel>>(allCustomers);
            return Ok(await Task.FromResult(mapCustomers));
        }



        //[HttpGet("throw")]
        //public IEnumerable<CustomerViewModel> Throw()
        //{
        //    throw new InvalidOperationException("This is a test exception: " + DateTime.Now);
        //}



        //[HttpGet("email")]
        //public async Task<string> Email()
        //{
        //    string recepientName = "QickApp Tester"; //         <===== Put the recepient's name here
        //    string recepientEmail = "test@ebenmonney.com"; //   <===== Put the recepient's email here

        //    string message = EmailTemplates.GetTestEmail(recepientName, DateTime.UtcNow);

        //    (bool success, string errorMsg) = await _emailer.SendEmailAsync(recepientName, recepientEmail, "Test Email from QuickApp", message);

        //    if (success)
        //        return "Success";

        //    return "Error: " + errorMsg;
        //}



        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value: " + id;
        //}



        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}



        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}



        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
