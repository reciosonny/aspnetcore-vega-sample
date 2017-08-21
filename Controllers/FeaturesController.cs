using System.Collections.Generic;
using System.Threading.Tasks;
using aspnetcore_vega_sample.Controllers.Resources;
using aspnetcore_vega_sample.Core.Models;
using aspnetcore_vega_sample.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspnetcore_vega_sample.Controllers
{
    public class FeaturesController : Controller
  {
    private readonly VegaDbContext context;
    private readonly IMapper mapper;
    public FeaturesController(VegaDbContext context, IMapper mapper)
    {
      this.mapper = mapper;
      this.context = context;
    }

    [HttpGet("/api/features")]
    public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
    {
      var features = await context.Features.ToListAsync();
      
      return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features); 
    }
  }
}