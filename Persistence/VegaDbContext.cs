using aspnetcore_vega_sample.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnetcore_vega_sample.Persistence
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {
            
        }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }

    }
}