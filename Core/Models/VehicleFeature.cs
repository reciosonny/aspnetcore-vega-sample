using System.ComponentModel.DataAnnotations.Schema;

namespace aspnetcore_vega_sample.Core.Models
{
    ///<Summary>
    /// note: Intermediary to initiate many-to-many relationships
    ///</Summary>
    [Table("VehicleFeatures")]
    public class VehicleFeature
    {
        public int VehicleId { get; set; }
        public int FeatureId { get; set; }
        public Vehicle Vehicle { get; set; }
        public Feature Feature { get; set; }
    }
}