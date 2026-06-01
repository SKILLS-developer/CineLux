using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentRequest request)
        {
            if (request == null || request.UserId <= 0 || request.PlanId <= 0)
            {
                return BadRequest("Invalid payment data.");
            }

            var userExists = await _context.Users.AnyAsync(u => u.UserId == request.UserId);
            if (!userExists)
            {
                return BadRequest("User not found.");
            }

            var plan = await _context.SubscriptionPlan.FirstOrDefaultAsync(p =>
                p.PlanId == request.PlanId && p.IsActive);
            if (plan == null)
            {
                return BadRequest("Plan not found or inactive.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var utcNow = DateTime.UtcNow;
                var startDate = DateOnly.FromDateTime(utcNow);
                var currentPeriodEnd = plan.BillingInterval.Equals("yearly", StringComparison.OrdinalIgnoreCase)
                    ? startDate.AddYears(1)
                    : startDate.AddMonths(1);

                var activeSubscriptions = await _context.UserSubscriptions
                    .Where(s => s.UserId == request.UserId && s.Status.ToLower() == "active")
                    .ToListAsync();

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

                await _context.UserSubscriptions.AddAsync(subscription);
                await _context.SaveChangesAsync();

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

                await _context.Payments.AddAsync(payment);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

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
            catch
            {
                await transaction.RollbackAsync();
                return StatusCode(500, "Payment could not be completed.");
            }
        }
    }
}