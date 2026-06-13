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

        public PaymentController(AppDbContext context)
        {
            _context = context;
        }

        public sealed class CreatePaymentRequest
        {
            public long UserId { get; set; }
            public long PlanId { get; set; }
            public string PaymentMethod { get; set; } = "card";
        }

        [HttpPost("create-payment")]
        public IActionResult CreatePayment([FromBody] CreatePaymentRequest request)
        {
            if (request == null || request.UserId <= 0 || request.PlanId <= 0)
            {
                return BadRequest("Invalid payment data.");
            }

            var userExists = _context.Users.Any(u => u.UserId == request.UserId);
            if (!userExists)
            {
                return BadRequest("User not found.");
            }

            var plan = _context.SubscriptionPlan.FirstOrDefault(p =>
                p.PlanId == request.PlanId && p.IsActive);
            if (plan == null)
            {
                return BadRequest("Plan not found or inactive.");
            }

            using var transaction = _context.Database.BeginTransaction();

            try
            {
                var utcNow = DateTime.UtcNow;
                var startDate = DateOnly.FromDateTime(utcNow);
                var currentPeriodEnd = plan.BillingInterval.Equals("yearly", StringComparison.OrdinalIgnoreCase)
                    ? startDate.AddYears(1)
                    : startDate.AddMonths(1);

                var activeSubscriptions = _context.UserSubscriptions
                    .Where(s => s.UserId == request.UserId && s.Status.ToLower() == "active")
                    .ToList();

                foreach (var existing in activeSubscriptions)
                {
                    existing.Status = "canceled";
                    existing.CanceledAt = utcNow;
                }

                var subscription = new UserSubscription
                {
                    UserId = request.UserId,
                    PlanId = request.PlanId,
                    Status = "active",
                    StartDate = startDate,
                    CurrentPeriodStart = startDate,
                    CurrentPeriodEnd = currentPeriodEnd,
                    CreatedAt = utcNow,
                };

                _context.UserSubscriptions.Add(subscription);
                _context.SaveChanges();

                var payment = new Payment
                {
                    SubscriptionId = subscription.SubscriptionId,
                    UserId = request.UserId,
                    Amount = plan.PriceAmount,
                    CurrencyCode = plan.CurrencyCode,
                    PaymentMethod = string.IsNullOrWhiteSpace(request.PaymentMethod)
                        ? "card"
                        : request.PaymentMethod.Trim().ToLower(),
                    PaymentStatus = "succeeded",
                    PaidAt = utcNow,
                    CreatedAt = utcNow,
                };

                _context.Payments.Add(payment);
                _context.SaveChanges();

                transaction.Commit();

                return Ok(new
                {
                    payment.PaymentId,
                    payment.SubscriptionId,
                    payment.Amount,
                    payment.CurrencyCode,
                    payment.PaymentStatus,
                    subscription.Status,
                    subscription.CurrentPeriodStart,
                    subscription.CurrentPeriodEnd,
                    plan.PlanName,
                    plan.BillingInterval,
                });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, $"Payment could not be completed. Error: {ex.Message}");
            }
        }
    }
}
