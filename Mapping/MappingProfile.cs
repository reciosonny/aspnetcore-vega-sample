using aspnetcore_vega_sample.Controllers.Resources;
using aspnetcore_vega_sample.Models;
using AutoMapper;

namespace aspnetcore_vega_sample.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();

        }
    }
}