using System.Threading.Tasks;
using aspnetcore_vega_sample.Models;

namespace aspnetcore_vega_sample.Persistence
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         void Add(Vehicle v);
         void Remove(Vehicle v);
    }
}