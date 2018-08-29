using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Purchase.DataAccess.Contracts
{
    public interface IRepository<T>
        where T : class
    {
        T Use(DbConnection connection);
    }
}
