using Oracle.ManagedDataAccess.Client;
using Purchase.DataAccess.Contracts;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Purchase.DataAccess.Oracle
{
    public class OracleDbConnectionFactory : IDbConnectionFactory
    {
        private readonly IConnectionStringProvider _csProvider;

        public OracleDbConnectionFactory(IConnectionStringProvider csProvider)
        {
            _csProvider = csProvider;
        }

        public DbConnection GetConnection()
        {
            return new OracleConnection(_csProvider.GetConnectionString());
        }
    }
}
