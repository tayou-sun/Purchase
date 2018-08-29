using System;

namespace Purchase.DataAccess
{
    public interface IConnectionStringProvider
    {
        string GetConnectionString();
    }
}
