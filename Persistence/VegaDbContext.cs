using aspnetcore_vega_sample.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnetcore_vega_sample.Persistence
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {
            
        }
        //We need to override this to implement many-to-many relationship correctly. Composite key
        //Uses Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => 
              new { vf.VehicleId, vf.FeatureId });
        }


    }
}