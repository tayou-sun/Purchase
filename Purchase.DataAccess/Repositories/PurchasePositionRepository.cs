using Dapper;
using Purchase.DataAccess.Contracts;
using Purchase.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace Purchase.DataAccess.Repositories
{
    public class PurchasePositionRepository : RepositoryBase, IPurchasePositionRepository
    {
        public PurchasePositionRepository(IDbConnectionFactory dbConnFactory) : base(dbConnFactory) { }

        public DbPurchasePosition GetPurchasePositionDetailed(int id)
        {
            var q = @"select ""ENTITY_ID"", max(""5807"") ""IKZ"", max(""5803"") ""Programm"", max(""5802"") ""Event"", 
    max(""5808"") ""PurchObjInfo"", max(""5804"") ""ExpectedResult"", max(""5809"") ""PublishYear"" from
(select * from ""ENTITY2ATTRIBUTE"" where ""ENTITY_ID"" = :entity_id
)  a
pivot(max(""VALUE"") for ""ENTITY_ATTRIBUTE_ID"" in (5807, 5803, 5802, 5808, 5804, 5809))
                group by ""ENTITY_ID""";
            return
                WithConnection(db => db.Query<DbPurchasePosition>(q, new { entity_id = id }).FirstOrDefault());
        }

        public List<DbPurchasePosition> GetPurchasePositionsForPurchase(int id)
        {
            var q = @"select ""ENTITY_ID"", max(""5807"") ""IKZ"", max(""5803"") ""Programm"", max(""5802"") ""Event"", 
    max(""5808"") ""PurchObjInfo"", max(""5804"") ""ExpectedResult"", max(""5809"") ""PublishYear"" from
(select * from ""ENTITY2ATTRIBUTE"" where ""ENTITY_ID"" in
(select ""ENTITY2_ID"" from ""ENTITY_RELATION"" et, ""ENTITY"" e where ""ENTITY1_ID"" = :entity_id and
et.ENTITY2_ID = e.""ENTITY_ID"" and e.""ENTITY_TYPE_ID"" = 5048146)
)  a
pivot(max(""VALUE"") for ""ENTITY_ATTRIBUTE_ID"" in (5807, 5803, 5802, 5808, 5804, 5809))
                group by ""ENTITY_ID""";
            return
                WithConnection(db => db.Query<DbPurchasePosition>(q, new { entity_id = id }).ToList());
        }

        public IPurchasePositionRepository Use(DbConnection connection)
        {
            Connection = connection;
            return this;
        }
    }
}
