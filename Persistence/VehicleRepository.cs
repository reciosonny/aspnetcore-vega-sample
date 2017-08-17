using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using aspnetcore_vega_sample.Core;
using aspnetcore_vega_sample.Core.Models;
using aspnetcore_vega_sample.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

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

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj) {
            var result = new QueryResult<Vehicle>();

            IQueryable<Vehicle> query = context.Vehicles
                    .Include(v => v.Features) //entity framework automatically adds "order by id" when using include syntax
                        .ThenInclude(m => m.Feature)
                    .Include(v => v.Model)
                        .ThenInclude(vf => vf.Make)
                    .AsQueryable();
            // .ToListAsync();

            if (queryObj.MakeId.HasValue) {
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);
            }
            if (queryObj.ModelId.HasValue) {
                query = query.Where(v => v.ModelId == queryObj.ModelId.Value);
            }

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>() {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName
                // ["id"] = v => v.Id
            };

            // query = ApplyOrdering(queryObj, query, columnsMap);
            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }

        public void Add(Vehicle v) {
            context.Vehicles.Add(v);
        }

        public void Remove(Vehicle v) {
            context.Vehicles.Remove(v);
        }


    }
}