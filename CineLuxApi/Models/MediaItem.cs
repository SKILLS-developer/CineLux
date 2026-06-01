using System.ComponentModel.DataAnnotations;

namespace CineLuxApi.Models
{
    public class MediaItem
    {
        [Key]
        public long MediaId { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string MediaType { get; set; } = "movie";

        [MaxLength(500)]
        public string? Synopsis { get; set; }

        [MaxLength(80)]
        public string? Genre { get; set; }

        public DateOnly? ReleaseDate { get; set; }

        public int? RuntimeMinutes { get; set; }

        public bool IsFree { get; set; } = false;

        [MaxLength(2048)]
        public string? PosterUrl { get; set; }
        [MaxLength(2048)]
        public string? TrailerUrl { get; set; }
        [MaxLength(2048)]
        public string? StreamUrl { get; set; }

        public double? AverageRating { get; set; }

        public long TotalViews { get; set; } = 1000;


        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
