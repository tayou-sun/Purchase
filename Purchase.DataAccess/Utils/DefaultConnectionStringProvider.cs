using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.DataAccess.Utils
{
    public class DefaultConnectionStringProvider : IConnectionStringProvider
    {
        public string GetConnectionString()
        {
            // При желании можно вынести в конфиг и читать оттуда
            return @"Data Source=192.168.12.127:1521/dev;User ID=P_MSTK_MAP;Password=1234";

            //return @"Data Source=192.168.12.127:1521/dev;User ID=P_BKD_DEV;Password=1234";
            //return @"Data Source=192.168.12.127:1521/dev;User ID=P_BKD;Password=69JOJKBn";
        }
    }
}
