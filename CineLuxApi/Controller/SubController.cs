using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
using Microsoft.EntityFrameworkCore;
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

        [HttpPost("add-plan")]
        public IActionResult Subscribe(SubscriptionPlan sub)
        {
            sub.CreatedAt = DateTime.UtcNow;
            _context.SubscriptionPlan.Add(sub);
            _context.SaveChanges();

            return Ok(sub);
        }

        [HttpGet("plans/{billingInterval}")]
        public IActionResult GetPlansByInterval(string billingInterval)
        {
            var plans = _context.SubscriptionPlan
                .Where(p => p.BillingInterval == billingInterval)
                .ToList();
            return Ok(plans);
        }

        [HttpGet("billing-intervals")]
        public IActionResult GetBillingIntervals()
        {
            var billingIntervals = _context.SubscriptionPlan
                .Select(p => p.BillingInterval)
                .Distinct()
                .ToList();
            return Ok(billingIntervals);
        }

        [HttpGet("plansDetails/{planCode}")]
        public IActionResult GetPlanByCode(string planCode)
        {
            var plan = _context.SubscriptionPlan.FirstOrDefault(p => p.PlanCode == planCode);
            if (plan == null)
            {
                return NotFound();
            }
            return Ok(plan);
        }
    }
}
