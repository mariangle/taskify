using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Context;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto req)
        {

            if (req.Username == null)
            {
                return BadRequest("Username is required.");
            }

            if (req.Password == null)
            {
                return BadRequest("Password is required.");
            }

            string lowerCaseUsername = req.Username.ToLower();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == lowerCaseUsername);

            if (user == null)
            {
                return BadRequest("Username does not exist.");
            }

            if (!VerifyPasswordHash(req.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto req)
        {
            if (req.Username == null || req.Name == null || req.Password == null)
            {
                return BadRequest("Username, name, and password are required.");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == req.Username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists.");
            }

            User user = new User
            {
                Id = Guid.NewGuid(),
                Username = req.Username.ToLower(),
                Name = req.Name
            };

            CreatePasswordHash(req.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
