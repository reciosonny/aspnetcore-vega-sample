using System.Threading.Tasks;
using aspnetcore_vega_sample.Core;
using aspnetcore_vega_sample.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnetcore_vega_sample.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true) {
            if (!includeRelated) {
                return await context.Vehicles.FindAsync(id);
            }

            return await context.Vehicles
                    .Include(v => v.Features)
                        .ThenInclude(m => m.Feature)
                    .Include(v => v.Model)
                        .ThenInclude(vf => vf.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle v) {
            context.Vehicles.Add(v);
        }

        public void Remove(Vehicle v) {
            context.Vehicles.Remove(v);
        }


    }
}