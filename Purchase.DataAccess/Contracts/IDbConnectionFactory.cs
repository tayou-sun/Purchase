using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Purchase.DataAccess.Contracts
{
    public interface IDbConnectionFactory
    {
        DbConnection GetConnection();
    }
}
