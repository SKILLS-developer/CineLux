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
        public async Task<IActionResult> Subscribe(SubscriptionPlan sub)
        {
            sub.CreatedAt = DateTime.UtcNow;
            await _context.SubscriptionPlan.AddAsync(sub);
            await _context.SaveChangesAsync();

            return Ok(sub);
        }

        [HttpGet("plans/{billingInterval}")]
        public async Task<IActionResult> GetPlansByInterval(string billingInterval)
        {
            var plans = await _context.SubscriptionPlan
                .Where(p => p.BillingInterval == billingInterval)
                .ToListAsync();
            return Ok(plans);
        }

        [HttpGet("billing-intervals")]
        public async Task<IActionResult> GetBillingIntervals()
        {
            var billingIntervals = await _context.SubscriptionPlan
                .Select(p => p.BillingInterval)
                .Distinct()
                .ToListAsync();
            return Ok(billingIntervals);
        }

        [HttpGet("plansDetails/{planCode}")]
        public async Task<IActionResult> GetPlanByCode(string planCode)
        {
            var plan = await _context.SubscriptionPlan.FirstOrDefaultAsync(p => p.PlanCode == planCode);
            if (plan == null)
            {
                return NotFound();
            }
            return Ok(plan);
        }
    }
}