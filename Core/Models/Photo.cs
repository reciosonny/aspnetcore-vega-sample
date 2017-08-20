using System.ComponentModel.DataAnnotations;

namespace aspnetcore_vega_sample.Core.Models
{
    public class Photo
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FileName { get; set; }

    }
}