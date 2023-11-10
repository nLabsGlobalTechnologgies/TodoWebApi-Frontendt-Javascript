using IEATodoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace IEATodoAPI.Context
{
    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("your connection information");
        }
        public DbSet<Todo> Todos { get; set; }
    }
}
