using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
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
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre ,m.MediaType })
                .ToList();
            return Ok(mediaItems);
        }

        [HttpGet("shows")]
        public IActionResult GetAllShows()
        {
            var shows = _context.MediaItems
                .Where(m => m.MediaType.Contains("series"))
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre , m.MediaType})
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
        public IActionResult GetLatestRelease(){
            var lrelease =_context.MediaItems.OrderByDescending(m => m.CreatedAt)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre ,m.IsFree})
                .Take(5)
                .ToList();
            return Ok(lrelease);
        }
        [HttpGet("trending")]
        public IActionResult GetTrending(){
            var trending = _context.MediaItems.OrderByDescending(m => m.AverageRating)
                .Select(m => new { m.MediaId, m.PosterUrl, m.Title, m.AverageRating, m.Genre ,m.IsFree})
                .Take(5)
                .ToList();
            return Ok(trending);
        }
        [HttpGet("{id}")]
        public IActionResult GetMediaById(int id)
        {
            var media = _context.MediaItems.FirstOrDefault(m => m.MediaId == id);
            if (media == null)
            {
                return NotFound();
            }
            return Ok(media);
        }
    }   
}