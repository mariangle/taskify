using server.Models;
using System.Security.Claims;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;

        }

        public User GetCurrentUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst("Id")?.Value;
            var parsedUserId = userId != null ? Guid.Parse(userId) : Guid.Empty;

            var username = _httpContextAccessor.HttpContext.User.FindFirst("Username")?.Value;
            var name = _httpContextAccessor.HttpContext.User.FindFirst("Name")?.Value;

            return new User
            {
                Id = parsedUserId,
                Username = username,
                Name = name
            };
        }

        public Guid GetUserId()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst("Id")?.Value;
            var parsedUserId = userId != null ? Guid.Parse(userId) : Guid.Empty;

            return parsedUserId;
        }
    }
}
