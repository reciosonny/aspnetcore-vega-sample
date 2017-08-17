using System.Collections.Generic;
using System.Threading.Tasks;
using aspnetcore_vega_sample.Core.Models;

namespace aspnetcore_vega_sample.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj);
         void Add(Vehicle v);
         void Remove(Vehicle v);
    }
}