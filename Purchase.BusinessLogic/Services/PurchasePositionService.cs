using Purchase.BusinessLogic.Contracts;
using Purchase.DataAccess.Contracts;
using Purchase.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Purchase.BusinessLogic.Services
{
    public class PurchasePositionService : IPurchasePositionService
    {
        private readonly IPurchasePositionRepository _purchasePositionRepo;

        public PurchasePositionService(IPurchasePositionRepository purchasePositionRepo)
        {
            _purchasePositionRepo = purchasePositionRepo;
        }

        public PurchasePositionDto GetPurchasePositionDetailed(int id)
        {
            var data = _purchasePositionRepo.GetPurchasePositionDetailed(id);
            return new PurchasePositionDto()
            {
                ENTITY_ID = data.ENTITY_ID,
                Event = data.Event,
                ExpectedResult = data.ExpectedResult,
                IKZ = data.IKZ,
                Programm = data.Programm,
                PublishYear = data.PublishYear,
                PurchObjInfo = data.PurchObjInfo
            };
        }

        public List<PurchasePositionDto> GetPurchasePositionsForPurchase(int id)
        {
            var data = _purchasePositionRepo.GetPurchasePositionsForPurchase(id);
            var items = data.Select(item => new PurchasePositionDto()
            {
                ENTITY_ID = item.ENTITY_ID,
                IKZ = item.IKZ,
                Event = item.Event,
                ExpectedResult = item.ExpectedResult,
                Programm = item.Programm,
                PublishYear = item.PublishYear,
                PurchObjInfo = item.PurchObjInfo
            }).ToList();
            var res = new List<PurchasePositionDto>();
            res.AddRange(items);
            return res;
        }
    }
}
