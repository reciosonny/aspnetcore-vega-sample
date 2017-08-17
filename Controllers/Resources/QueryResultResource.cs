using System.Collections.Generic;

namespace aspnetcore_vega_sample.Controllers.Resources
{
    public class QueryResultResource<T>
    {   
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}