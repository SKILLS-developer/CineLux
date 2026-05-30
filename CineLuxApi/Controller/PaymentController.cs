using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
namespace CineLuxApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PaymentController (AppDbContext context)
        {
            _context=context;
        }
        
    }
}