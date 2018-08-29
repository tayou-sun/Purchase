using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Purchase.BusinessLogic.Contracts;
using Purchase.Dto;

namespace Purchase.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : Controller
    {
        private readonly IPurchaseService _purchaseService;
        private readonly IPurchasePositionService _purchasePositionService;

        public PurchaseController(IPurchaseService purchaseService, IPurchasePositionService purchasePositionService)
        {
            _purchaseService = purchaseService;
            _purchasePositionService = purchasePositionService;
        }

        [HttpGet]
        [Route("GetPurchases")]
        public SearchPurchaseResponseDto GetList()
        {
            return _purchaseService.GetList();
        }

        [HttpGet]
        [Route("getPurchasePositions")]
        public List<PurchasePositionDto> GetList(int id)
        {
            return _purchasePositionService.GetPurchasePositionsForPurchase(id);
        }

        [HttpGet]
        [Route("GetPurchaseDetailed")]
        public PurchaseFullDto PurchaseDetails(int id)
        {
            return _purchaseService.GetPurchaseDetailed(id);
        }

        [HttpGet]
        [Route("GetPurchasePositionDetailed")]
        public PurchasePositionDto PurchasePositionDetails(int id)
        {
            return _purchasePositionService.GetPurchasePositionDetailed(id);
        }

        [HttpPost]
        [Route("AddPurchase")]
        public int AddPurchase([FromBody]PurchaseFullDto purchase)
        {
            return _purchaseService.AddPurchase(purchase);
        }

        [HttpPost]
        [Route("search")]
        public SearchPurchaseResponseDto Search([FromBody]SearchPurchaseResponseDto request)
        {
            return _purchaseService.Search(request);
        }

        [HttpGet("purchaseNotifications")]
        public SearchPurchaseNotificationResponseDto GetPurchaseNotifications()
        {
            return _purchaseService.GetPurchaseNotification();
        }

        [HttpGet("purchaseNotificationDetail")]
        public PurchaseFullDto GetPurchaseNotificationDetail(int id)
        {
            return _purchaseService.GetPurchaseDetailed(id);
        }
    }
}