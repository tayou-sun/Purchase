using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.DataAccess.Model
{
    public class DbPurchaseNotification
    {
        public long ENTITY_ID { get; set; }

        public long Src_id { get; set; }

        public string SourceSystem { get; set; }
        
    }

    public class DbPurchaseNotificationFull
    {
        public DateTime CollectingEndDate { get; set; }

        public DateTime CollectingOpenDate { get; set; }

        public string CollectingOrder { get; set; }

        public string CollectingPlace { get; set; }

        public DateTime CollectingStartDate { get; set; }

        public DateTime CreationDate { get; set; }

        public string GZHREF { get; set; }

        public string GZREGNUM { get; set; }

        public bool IsChecked { get; set; }

        public DateTime ModificationDate { get; set; }

        public string ModificationInfo { get; set; }

        public string Owner { get; set; }

        public DateTime PublishDate { get; set; }

        public string PurchaseObjInfo { get; set; }

        public string PurchaseType { get; set; }

        public DateTime ScoringDate { get; set; }

        public string SourceSystem { get; set; }

        public long Src_id { get; set; }
    }
}
