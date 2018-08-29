using Purchase.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.DataAccess.Contracts
{
    public interface IPurchasePositionRepository : IRepository<IPurchasePositionRepository>
    {
        List<DbPurchasePosition> GetPurchasePositionsForPurchase(int id);
        DbPurchasePosition GetPurchasePositionDetailed(int id);
    }
}
