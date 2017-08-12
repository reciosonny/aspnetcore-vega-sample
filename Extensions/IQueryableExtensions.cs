using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using aspnetcore_vega_sample.Core.Models;

namespace aspnetcore_vega_sample.Extensions
{
    public static class IQueryableExtensions {

        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap) {

            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return query;

            query = queryObj.IsSortAscending ? 
                        query.OrderBy(columnsMap[queryObj.SortBy]) : 
                        query.OrderByDescending(columnsMap[queryObj.SortBy]);

            return query;
        }

    }
}