using System;
using System.Collections.Generic;
using System.Text;

namespace Purchase.DataAccess.Model
{
    public class DbPurchasePosition
    {
        public long ENTITY_ID { get; set; }

        public string IKZ { get; set; }

        public string Programm { get; set; }

        public string Event { get; set; }

        public string PurchObjInfo { get; set; }

        public string ExpectedResult { get; set; }

        public string PublishYear { get; set; }
    }
}
