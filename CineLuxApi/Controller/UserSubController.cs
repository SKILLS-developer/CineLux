using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
namespace CineLuxApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserSubController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserSubController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("subscribe")]
        public IActionResult Subscribe(UserSubscription subscription)
        {
            subscription.CreatedAt = DateTime.UtcNow;
            _context.UserSubscriptions.Add(subscription);
            _context.SaveChanges();

            return Ok(subscription);
        }
        [HttpGet("user/{userId}")]
        public IActionResult GetUserSubscription(int userId)
        {
            var subscription = _context.UserSubscriptions.Where(s => s.UserId == userId).ToList();
            if (subscription == null || subscription.Count == 0)
            {
                return NotFound();
            }
            return Ok(subscription);
        }
    }
}