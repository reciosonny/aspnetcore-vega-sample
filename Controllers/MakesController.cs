using System.Collections.Generic;
using System.Threading.Tasks;
using aspnetcore_vega_sample.Models;
using aspnetcore_vega_sample.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspnetcore_vega_sample.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDbContext context;
        public MakesController(VegaDbContext context) {
            this.context = context;
        }
        
        [HttpGet("/api/makes")]
        public async Task<IEnumerable<Make>> GetMakes() {
            return await context.Makes.Include(m => m.Models).ToListAsync();
        }
    }
}