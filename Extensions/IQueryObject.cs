namespace aspnetcore_vega_sample.Extensions
{
    public interface IQueryObject {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }

    }
}