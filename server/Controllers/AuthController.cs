using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Context;
using server.Models;
using server.Services;
using server.Utility;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthUtils _auth;
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public AuthController(ApplicationContext context, IConfiguration configuration, IUserService userService)
        {
            _context = context;
            _userService = userService;
            _auth = new AuthUtils(configuration);
            _config = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto req)
        {

            if (req.Email == null)
            {
                return BadRequest("Email is required.");
            }

            if (req.Password == null)
            {
                return BadRequest("Password is required.");
            }

            string lowerCaseEmail = req.Email.ToLower();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == lowerCaseEmail);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (!_auth.VerifyPasswordHash(req.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = _auth.CreateToken(user);

            return Ok(token);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto req)
        {
            if (req.Email == null || req.Name == null || req.Password == null)
            {
                return BadRequest("Missing fields.");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already exists.");
            }

            User user = new User
            {
                Id = Guid.NewGuid(),
                Email = req.Email,
                Name = req.Name
            };

            _auth.CreatePasswordHash(req.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet("validate-token")]
        [Authorize]
        public ActionResult ValidateToken()
        {
            var currentUser = _userService.GetCurrentUser();
            return Ok(currentUser);
        }

        [HttpPost("logout"), Authorize]
        public ActionResult Logout()
        {
            return Ok("Logout successful");
        }

        [HttpGet("current-user"), Authorize]
        public ActionResult<User> GetCurrentUser()
        {
            var currentUser = _userService.GetCurrentUser();
            return Ok(currentUser);
        }
    }
}
