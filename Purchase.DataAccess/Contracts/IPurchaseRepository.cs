using Purchase.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.DataAccess.Contracts
{
    public interface IPurchaseRepository : IRepository<IPurchaseRepository>
    {
        List<DbPurchase> GetList();

        DbPurchaseFull GetPurchaseDetailed(int id);

        int AddPurchase(DbPurchaseFull purchase);

        List<DbPurchaseNotification> GetPurchaseNotifications();
    }
}
