using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Context;
using server.Models;
using server.Services;
using server.Utility;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace server.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthUtils _auth;
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;

        public AuthController(ApplicationContext context, IConfiguration configuration, IUserService userService)
        {
            _context = context;
            _userService = userService;
            _auth = new AuthUtils(configuration);
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

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == lowerCaseUsername);

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
            if (req.Username == null || req.Name == null || req.Password == null)
            {
                return BadRequest("Missing fields.");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == req.Username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists.");
            }

            User user = new User
            {
                Id = Guid.NewGuid(),
                Username = req.Username,
                Name = req.Name
            };

            _auth.CreatePasswordHash(req.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet("check")]
        public bool CheckLogged()
        {
            var result = HttpContext.User.Identity.IsAuthenticated;
            return result;
        }

        [HttpPost("logout"), Authorize]
        public async Task<ActionResult> Logout()
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
