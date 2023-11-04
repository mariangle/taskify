using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        User GetCurrentUser();

        Guid GetUserId();
    }
}
