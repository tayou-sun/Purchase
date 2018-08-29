using Purchase.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.BusinessLogic.Contracts
{
    public interface IPurchasePositionService
    {
        List<PurchasePositionDto> GetPurchasePositionsForPurchase(int id);

        PurchasePositionDto GetPurchasePositionDetailed(int id);
    }
}
