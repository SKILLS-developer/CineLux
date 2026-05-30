using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
namespace CineLuxApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("subscribe")]
        public IActionResult Subscribe(SubscriptionPlan sub)
        {
            _context.SubscriptionPlan.Add(sub);
            _context.SaveChanges();

            return Ok(sub);
        }
        [HttpGet("plans")]
        public IActionResult GetPlans()
        {
            var plans = _context.SubscriptionPlan.ToList();
            return Ok(plans);
        }
    }
}