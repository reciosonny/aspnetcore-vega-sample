using System.Threading.Tasks;
using aspnetcore_vega_sample.Core;

namespace aspnetcore_vega_sample.Persistence
{
    class UnitOfWork : IUnitOfWork {
        private readonly VegaDbContext context;
        public UnitOfWork(VegaDbContext context) {
            this.context = context;
        }

        public async Task CompleteAsync() {
            await context.SaveChangesAsync();
        }

    }
}