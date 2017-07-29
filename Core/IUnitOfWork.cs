using System;
using System.Threading.Tasks;

namespace aspnetcore_vega_sample.Core
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}