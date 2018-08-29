using Purchase.BusinessLogic.Contracts;
using Purchase.DataAccess.Contracts;
using Purchase.DataAccess.Model;
using Purchase.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Purchase.BusinessLogic.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IPurchaseRepository _purchaseRepo;

        public PurchaseService(IPurchaseRepository purchaseRepo)
        {
            _purchaseRepo = purchaseRepo;
        }

        public SearchPurchaseResponseDto GetList()
        {
            var data = _purchaseRepo.GetList();
            var res = new SearchPurchaseResponseDto()
            {
                Purchases = data.Select(item => new PurchaseDto() { ENTITY_ID = item.ENTITY_ID, SourceSystem = item.SourceSystem,
                    Src_id = item.Src_id, SummTotal = item.SummTotal}).ToList()
            };
            return res;
        }
        
        public PurchaseFullDto GetPurchaseDetailed(int id)
        {
            var data = _purchaseRepo.GetPurchaseDetailed(id);
            return new PurchaseFullDto()
            {
                ENTITY_ID = data.ENTITY_ID,
                SourceSystem = data.SourceSystem,
                Src_id = data.Src_id,
                SummTotal = data.SummTotal,
                GZREGNUM = data.GZREGNUM,
                VersionNumber = data.VersionNumber,
                PlanYear = data.PlanYear,
                PlanFirstYear = data.PlanFirstYear,
                PlanSecondYear = data.PlanSecondYear,
                ConfirmDate = data.ConfirmDate,
                CreateDate = data.CreateDate,
                SummCurYear = data.SummCurYear,
                SummFirstYear = data.SummFirstYear,
                SummSecondaryYear = data.SummSecondaryYear,
                SummSubsecYear = data.SummSecondaryYear
            };
        }

        public SearchPurchaseResponseDto Search(SearchPurchaseResponseDto request)
        {
            throw new NotImplementedException();
        }

        public int AddPurchase(PurchaseFullDto purchase)
        {
            var item = new DbPurchaseFull();
            item.PlanYear = purchase.PlanYear; 
            
            return _purchaseRepo.AddPurchase(item);
        }

        public SearchPurchaseNotificationResponseDto GetPurchaseNotification()
        {
            var data = _purchaseRepo.GetPurchaseNotifications();
            var res = new SearchPurchaseNotificationResponseDto()
            {
                PurchaseNotifications = data.Select(item => new PurchaseNotificationDto()
                {
                    ENTITY_ID = item.ENTITY_ID,
                    SourceSystem = item.SourceSystem,
                    Src_id = item.Src_id
                }).ToList()
            };
            return res;
        }
    }
}
