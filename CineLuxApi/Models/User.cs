using System.ComponentModel.DataAnnotations;

namespace CineLuxApi.Models
{
    public class User
    {
        [Key]
        public long UserId { get; set; }

        [MaxLength(120)]
        public string FullName { get; set; } = string.Empty;

        [Required, MaxLength(255), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8), DataType(DataType.Password)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Role { get; set; } = "viewer";
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<UserSubscription> Subscriptions { get; set; } = [];
        public ICollection<Payment> Payments { get; set; } = [];

    }
}