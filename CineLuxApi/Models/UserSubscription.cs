using System.ComponentModel.DataAnnotations;

namespace CineLuxApi.Models
{
    public class UserSubscription
    {
        [Key]
        public long SubscriptionId { get; set; }

        public long UserId { get; set; }
        public long PlanId { get; set; }

        [Required, MaxLength(20)]
        public string Status { get; set; } = string.Empty;  // active | canceled | expired | trialing | paused

        public DateOnly StartDate { get; set; }
        public DateOnly CurrentPeriodStart { get; set; }
        public DateOnly CurrentPeriodEnd { get; set; }

        public DateTime? CanceledAt { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public User User { get; set; } = null!;
        public SubscriptionPlan Plan { get; set; } = null!;
        public ICollection<Payment> Payments { get; set; } = [];
    }
}
