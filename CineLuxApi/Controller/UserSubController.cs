using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
using Microsoft.EntityFrameworkCore;
namespace CineLuxApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserSubController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserSubController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("subscribe")]
        public IActionResult Subscribe(UserSubscription subscription)
        {
            var plan = _context.SubscriptionPlan.Find(subscription.PlanId);
            var startDate = DateOnly.FromDateTime(DateTime.UtcNow);
            var periodEnd = plan != null && plan.BillingInterval.Equals("yearly", StringComparison.OrdinalIgnoreCase)
                ? startDate.AddYears(1)
                : startDate.AddMonths(1);

            subscription.Status = "active";
            subscription.StartDate = startDate;
            subscription.CurrentPeriodStart = startDate;
            subscription.CurrentPeriodEnd = periodEnd;
            subscription.CreatedAt = DateTime.UtcNow;
            _context.UserSubscriptions.Add(subscription);
            _context.SaveChanges();

            return Ok(subscription);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserSubscription(long userId)
        {
            var subscription = _context.UserSubscriptions
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.CreatedAt)
                .Select(s => new
                {
                    s.SubscriptionId,
                    s.UserId,
                    s.PlanId,
                    s.Status,
                    s.CurrentPeriodStart,
                    s.CurrentPeriodEnd,
                    s.CreatedAt,
                    PlanName = s.Plan.PlanName,
                    PriceAmount = s.Plan.PriceAmount,
                    CurrencyCode = s.Plan.CurrencyCode,
                })
                .FirstOrDefault();

            if (subscription == null)
            {
                return Ok(null);
            }

            return Ok(subscription);
        }
    }
}
