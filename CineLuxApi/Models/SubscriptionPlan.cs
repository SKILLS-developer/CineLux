using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CineLuxApi.Models
{
    public class SubscriptionPlan
    {
        [Key]
        public long PlanId { get; set; }

        [Required, MaxLength(50)]
        public string PlanCode { get; set; } = string.Empty;   // e.g. basic_monthly

        [Required, MaxLength(100)]
        public string PlanName { get; set; } = string.Empty;

        [Required, MaxLength(10)]
        public string BillingInterval { get; set; } = string.Empty;  // monthly | yearly

        [Column(TypeName = "decimal(18,2)")]
        public decimal PriceAmount { get; set; }

        [Required, MaxLength(3)]
        public string CurrencyCode { get; set; } = "USD";

        public short MaxStreams { get; set; } = 1;

        [Required, MaxLength(20)]
        public string VideoQuality { get; set; } = "HD";   // SD | HD | UHD

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public ICollection<UserSubscription> Subscriptions { get; set; } = [];
    }
}
