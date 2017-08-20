using System.Collections.Generic;
using System.Threading.Tasks;
using aspnetcore_vega_sample.Core.Models;

namespace aspnetcore_vega_sample.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }

}