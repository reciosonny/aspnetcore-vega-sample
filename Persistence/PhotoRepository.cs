using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using aspnetcore_vega_sample.Core;
using aspnetcore_vega_sample.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnetcore_vega_sample.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;
        public PhotoRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }
    }
}