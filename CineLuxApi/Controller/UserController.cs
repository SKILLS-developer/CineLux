using Microsoft.AspNetCore.Mvc;
using CineLuxApi.Data;
using CineLuxApi.Models;
using Microsoft.EntityFrameworkCore;
namespace CineLuxApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            var emailExists = _context.Users.Any(u => u.Email == user.Email);
            if (emailExists) return BadRequest("An account with this email already exists.");

            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { user.UserId, user.FullName, user.Email, user.Role, user.CreatedAt });
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var existingUser = _context.Users.FirstOrDefault(x =>
                x.Email == user.Email &&
                x.PasswordHash == user.PasswordHash
            );

            if (existingUser == null)
            {
                return BadRequest("Invalid Email or Password");
            }

            return Ok(new { existingUser.UserId, existingUser.FullName, existingUser.Email, existingUser.Role, existingUser.CreatedAt });
        }

        [HttpPost("admin")]
        public IActionResult GetAdminUsers(User user)
        {
            var adminUser = _context.Users.FirstOrDefault(x =>
                x.Email == user.Email &&
                x.PasswordHash == user.PasswordHash &&
                x.Role == "admin"
            );

            if (adminUser == null)
            {
                return BadRequest("Invalid Email or Password");
            }

            return Ok(new { adminUser.UserId, adminUser.FullName, adminUser.Email, adminUser.Role, adminUser.CreatedAt });
        }
    }
}
