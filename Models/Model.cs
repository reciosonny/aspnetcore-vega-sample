namespace aspnetcore_vega_sample.Models
{
    public class Model
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //Navigation property
        public Make Make { get; set; }
        public int MakeId { get; set; }
    }
}