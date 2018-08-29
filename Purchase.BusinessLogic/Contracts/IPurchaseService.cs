using Purchase.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.BusinessLogic.Contracts
{
    public interface IPurchaseService
    {
        SearchPurchaseResponseDto Search(SearchPurchaseResponseDto request);

        SearchPurchaseResponseDto GetList();

        PurchaseFullDto GetPurchaseDetailed(int id);

        int AddPurchase(PurchaseFullDto purchase);

        SearchPurchaseNotificationResponseDto GetPurchaseNotification();

    }
}
