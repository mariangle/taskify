using Microsoft.EntityFrameworkCore;
using server.Context;

namespace server.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ApplicationContext>>()))
            {
                // Look for any surfboards
                if (context.Users.Any())
                {
                    return;   // DB has been seeded
                }
            }
        }
    }
}
