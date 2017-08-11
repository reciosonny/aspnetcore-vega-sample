using System.Collections.Generic;
using System.Threading.Tasks;
using aspnetcore_vega_sample.Core.Models;

namespace aspnetcore_vega_sample.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery filter);
         void Add(Vehicle v);
         void Remove(Vehicle v);
    }
}