using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }

        public DbSet<server.Models.Task>? Tasks { get; set; }

        public DbSet<server.Models.Subtask>? Subtasks { get; set; }

        public DbSet<server.Models.RecurringTask>? RecurringTasks { get; set; }
    }
}
