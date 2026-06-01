using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
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
        public async Task<IActionResult> AddMedia(MediaItem media)
        {
            media.CreatedAt = DateTime.UtcNow;
            media.UpdatedAt = DateTime.UtcNow;

            await _context.MediaItems.AddAsync(media);
            await _context.SaveChangesAsync();

            return Ok(media);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllMedia()
        {
            var mediaItems = await _context.MediaItems
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree })
                .ToListAsync();
            return Ok(mediaItems);
        }

        [HttpGet("shows")]
        public async Task<IActionResult> GetAllShows()
        {
            var shows = await _context.MediaItems
                .Where(m => m.MediaType.Contains("series"))
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType })
                .ToListAsync();
            return Ok(shows);
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcoming()
        {
            var upcoming = await _context.MediaItems
                .Where(m => string.IsNullOrEmpty(m.StreamUrl))
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre })
                .ToListAsync();
            return Ok(upcoming);
        }

        [HttpGet("latest-release")]
        public async Task<IActionResult> GetLatestRelease()
        {
            var lrelease = await _context.MediaItems.OrderByDescending(m => m.CreatedAt)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.IsFree })
                .Take(5)
                .ToListAsync();
            return Ok(lrelease);
        }

        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending()
        {
            var trending = await _context.MediaItems.OrderByDescending(m => m.AverageRating)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.IsFree })
                .Take(5)
                .ToListAsync();
            return Ok(trending);
        }

        [HttpGet("search/{media?}")]
        public async Task<IActionResult> SearchMedia(string? media)
        {
            if (string.IsNullOrEmpty(media))
            {
                var all = await _context.MediaItems
                    .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree })
                    .ToListAsync();
                return Ok(all);
            }
            var results = await _context.MediaItems
                .Where(m => m.Title.Contains(media) || (m.Genre != null && m.Genre.Contains(media)) || m.MediaType.Contains(media))
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree })
                .ToListAsync();
            if (results.Count == 0)
            {
                return NotFound("No media items found matching the search criteria.");
            }
            return Ok(results);
        }
        [HttpGet("play/{id}")]
        public async Task<IActionResult> GetMediaById(long id)
        {
            var mediaItem = await _context.MediaItems
                .Where(m => m.MediaId == id)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre, m.MediaType, m.IsFree, m.StreamUrl, m.Synopsis, m.ReleaseDate, m.RuntimeMinutes, m.TotalViews })
                .FirstOrDefaultAsync();

            if (mediaItem == null)
            {
                return NotFound("Media item not found.");
            }

            return Ok(mediaItem);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateMedia(long id, MediaItem updated)
        {
            var media = await _context.MediaItems.FindAsync(id);
            if (media == null) return NotFound("Media item not found.");

            media.Title = updated.Title;
            media.Genre = updated.Genre;
            media.MediaType = updated.MediaType;
            media.AverageRating = updated.AverageRating;
            media.TotalViews = updated.TotalViews;
            media.IsFree = updated.IsFree;
            media.RuntimeMinutes = updated.RuntimeMinutes;
            media.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(media);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteMedia(long id)
        {
            var media = await _context.MediaItems.FindAsync(id);
            if (media == null) return NotFound("Media item not found.");

            _context.MediaItems.Remove(media);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}