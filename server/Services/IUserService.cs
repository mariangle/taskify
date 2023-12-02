using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        UserDto GetCurrentUser();

        Guid GetUserId();
    }
}
