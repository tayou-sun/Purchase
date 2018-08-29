using Purchase.DataAccess.Contracts;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;

namespace Purchase.DataAccess.Repositories
{
    public abstract class RepositoryBase
    {
        private readonly IDbConnectionFactory _dbConnFactory;
        protected DbTransaction Transaction { get; set; }
        protected DbConnection Connection { get; set; }

        protected RepositoryBase(IDbConnectionFactory dbConnFactory)
        {
            _dbConnFactory = dbConnFactory;
        }

        private DbConnection GetConnection()
        {
            return Connection ?? _dbConnFactory.GetConnection();
        }

        protected T WithConnection<T>(Func<DbConnection, T> func)
        {
            if (Connection != null)
            {
                try
                {
                    var res = func(Connection);

                    //CustomDbProfiler.Current.ProfilerContext.ExecutedCommands.Select(x => x.CommandText).ToList().ForEach(Log.Information);
                    return res;
                }
                catch (Exception exc)
                {
                    throw;
                }
            }
            else
            {
                using (var dbConn = GetConnection())
                {
                    try
                    {
                        if (dbConn.State != ConnectionState.Open)
                        {
                            dbConn.Open();
                        }

                        var res = func(dbConn);
                        dbConn.Close();
                        //CustomDbProfiler.Current.ProfilerContext.ExecutedCommands.Select(x => x.CommandText).ToList().ForEach(Log.Information);
                        return res;
                    }
                    catch (Exception exc)
                    {
                        throw;
                    }
                    finally
                    {
                        dbConn.Close();
                    }
                }
            }
        }

        protected void WithConnection(Action<DbConnection> action)
        {
            WithConnection(dbConn =>
            {
                action(dbConn);
                return 0;
            });
        }
    }
}
