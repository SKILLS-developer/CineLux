using CineLuxApi.Data;
using CineLuxApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace CineLuxApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MediaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public IActionResult AddMedia(MediaItem media)
        {
            media.CreatedAt = DateTime.UtcNow;
            media.UpdatedAt = DateTime.UtcNow;

            _context.MediaItems.Add(media);
            _context.SaveChanges();

            return Ok(media);
        }

        [HttpGet("all")]
        public IActionResult GetAllMedia()
        {
            var mediaItems = _context.MediaItems
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree })
                .ToList();
            return Ok(mediaItems);
        }

        [HttpGet("shows")]
        public IActionResult GetAllShows()
        {
            var shows = _context.MediaItems
                .Where(m => m.MediaType.Contains("series"))
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType })
                .ToList();
            return Ok(shows);
        }

        [HttpGet("upcoming")]
        public IActionResult GetUpcoming()
        {
            var upcoming = _context.MediaItems
                .Where(m => string.IsNullOrEmpty(m.StreamUrl))
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre })
                .ToList();
            return Ok(upcoming);
        }

        [HttpGet("latest-release")]
        public IActionResult GetLatestRelease()
        {
            var lrelease = _context.MediaItems.OrderByDescending(m => m.CreatedAt)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.IsFree })
                .Take(5)
                .ToList();
            return Ok(lrelease);
        }

        [HttpGet("trending")]
        public IActionResult GetTrending()
        {
            var trending = _context.MediaItems.OrderByDescending(m => m.AverageRating)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.IsFree })
                .Take(5)
                .ToList();
            return Ok(trending);
        }

        [HttpGet("search/{media?}")]
        public IActionResult SearchMedia(string? media)
        {
            if (string.IsNullOrEmpty(media))
            {
                var all = _context.MediaItems
                    .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree })
                    .ToList();
                return Ok(all);
            }
            var results = _context.MediaItems
                .Where(m => m.Title.Contains(media) || (m.Genre != null && m.Genre.Contains(media)) || m.MediaType.Contains(media))
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree })
                .ToList();
            if (results.Count == 0)
            {
                return NotFound("No media items found matching the search criteria.");
            }
            return Ok(results);
        }

        [HttpGet("play/{id}")]
        public IActionResult GetMediaById(long id)
        {
            var mediaItem = _context.MediaItems
                .Where(m => m.MediaId == id)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree, m.StreamUrl, m.Synopsis, m.ReleaseDate, m.RuntimeMinutes, m.TotalViews })
                .FirstOrDefault();

            if (mediaItem == null)
            {
                return NotFound("Media item not found.");
            }

            return Ok(mediaItem);
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateMedia(long id, MediaItem updated)
        {
            var media = _context.MediaItems.Find(id);
            if (media == null) return NotFound("Media item not found.");

            media.Title = updated.Title;
            media.Genre = updated.Genre;
            media.MediaType = updated.MediaType;
            media.AverageRating = updated.AverageRating;
            media.TotalViews = updated.TotalViews;
            media.IsFree = updated.IsFree;
            media.RuntimeMinutes = updated.RuntimeMinutes;
            media.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();
            return Ok(media);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteMedia(long id)
        {
            var media = _context.MediaItems.Find(id);
            if (media == null) return NotFound("Media item not found.");

            _context.MediaItems.Remove(media);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
