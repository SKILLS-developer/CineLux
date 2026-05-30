using System.ComponentModel.DataAnnotations;

namespace CineLuxApi.Models
{
    public class Payment
    {
        [Key]
        public long PaymentId { get; set; }

        public long SubscriptionId { get; set; }
        public long UserId { get; set; }

        public double Amount { get; set; }

        [Required, MaxLength(3)]
        public string CurrencyCode { get; set; } = "USD";

        [Required, MaxLength(30)]
        public string PaymentMethod { get; set; } = string.Empty;  // card | wallet | upi | etc.

        [MaxLength(120)]
        public string PaymentStatus { get; set; } = string.Empty;  // pending | succeeded | failed | refunded

        public DateTime? PaidAt { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public UserSubscription Subscription { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
