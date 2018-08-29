using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.DataAccess.Model
{
    public class DbPurchase
    {
        public long ENTITY_ID { get; set; }

        public long Src_id { get; set; }

        public string SourceSystem { get; set; }

        public decimal SummTotal { get; set; }
     }

    public class DbPurchaseFull
    {
        public long ENTITY_ID { get; set; }

        public long Src_id { get; set; }

        public string SourceSystem { get; set; }

        public decimal SummTotal { get; set; }

        public string GZREGNUM { get; set; }

        public int VersionNumber { get; set; }

        public int PlanYear { get; set; }

        public int PlanFirstYear { get; set; }

        public int PlanSecondYear { get; set; }

        public string ConfirmDate { get; set; }

        public string CreateDate { get; set; }

        public decimal SummCurYear { get; set; }
        public decimal SummFirstYear { get; set; }
        public decimal SummSecondaryYear { get; set; }
        public decimal SummSubsecYear { get; set; }
    }
}
