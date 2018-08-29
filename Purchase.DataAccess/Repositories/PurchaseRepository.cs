using Dapper;
using Purchase.DataAccess.Contracts;
using Purchase.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace Purchase.DataAccess.Repositories
{
    public class PurchaseRepository : RepositoryBase, IPurchaseRepository
    {
        public PurchaseRepository(IDbConnectionFactory dbConnFactory) : base(dbConnFactory) { }

        public List<DbPurchase> GetList()
        {
            var q = @"select ""ENTITY_ID"", ""5788"" ""Src_id"", ""5794"" ""SummTotal"", ""5789"" ""SourceSystem"" from
(select * from ""ENTITY2ATTRIBUTE"" where ""ENTITY_ID"" in
(select ""ENTITY_ID"" from ""ENTITY"" WHERE ""ENTITY_TYPE_ID"" = 5048139))  a
pivot(max(""VALUE"") for ""ENTITY_ATTRIBUTE_ID"" in (5788, 5794, 5789))
                group by ""ENTITY_ID"", ""5788"", ""5794"", ""5789""";
            return
                WithConnection(db => db.Query<DbPurchase>(q).ToList());
        }

        public DbPurchaseFull GetPurchaseDetailed(int id)
        {
            var q = @"select ""ENTITY_ID"", max(""5788"") ""Src_id"", max(""5794"") ""SummTotal"", max(""5789"") ""SourceSystem"", 
    max(""5801"") ""GZREGNUM"", max(""5800"") ""VersionNumber"", max(""5795"") ""PlanYear"", max(""5796"") ""PlanFirstYear"",
max(""5797"") ""PlanSecondYear"", max(""5799"") ""ConfirmDate"", max(""7171"") ""CreateDate"",
max(""5790"") ""SummSubsecYear"", max(""5791"") ""SummSecondaryYear"", max(""5792"") ""SummCurYear"", max(""5793"") ""SummFirstYear"" from
(select * from ""ENTITY2ATTRIBUTE"" where ""ENTITY_ID"" = :entity_id)  a
pivot(max(""VALUE"") for ""ENTITY_ATTRIBUTE_ID"" in (5788, 5794, 5789, 5801, 5800, 5795, 5796, 5797, 5799, 7171, 5790, 5791, 5792, 5793))
                group by ""ENTITY_ID""";
            return
                WithConnection(db => db.Query<DbPurchaseFull>(q, new { entity_id = id }).FirstOrDefault());
        }

        private int AddPurchaseEntity()
        {
            var param = new DynamicParameters();

            param.Add(name: "Id", dbType: DbType.Int32, direction: ParameterDirection.Output);

            var q = @"
            DECLARE
            BEGIN
                INSERT INTO ""ENTITY"" 
                 (""ENTITY_ID"", ""ENTITY_KIND_ID"", ""ENTITY_TYPE_ID"", ""SHORT_NAME"", ""FULL_NAME"", ""SRCSTM_ID"", ""ISACTUAL"", 
                    ""ENTITY_STATUS_ID"")
                VALUES
                (""ENTITY_SEQ"".nextval, 1, 5048139, 'тест план закупок',
                 'тестовыйы план закупок ' || TO_CHAR(SYSDATE, 'MM-DD-YYYY HH24:MI:SS'), 22, null, 16171) returning ""ENTITY_ID"" into :Id;
            END;";
            WithConnection(db => db.Execute(q, param));
            return param.Get<int>("Id");
        }

        private int GetAttributeIdByCode(string attributeCode)
        {
            var q = @"select e.""ENTITY_ATTRIBUTE_ID"" from ""ENTITY_ATTRIBUTE"" e where ""CODE""=:p_code and ""ENTITY_TYPE_ID"" = 5048139";
            var res = WithConnection(db => db.ExecuteScalar<int>(q, new { p_code = attributeCode }));
            return res;
        }

        private int AddAttributeValueByCode(int entityId, string attributeCode, string value)
        {
            var attrId = GetAttributeIdByCode(attributeCode);
            if (attrId != -1)
            {
                return AddAttributeValueById(entityId, attrId, value);
            }
            return -1;
        }

        private int AddAttributeValueById(int entityId, int attrId, string value)
        {
            var q = @"insert into ""ENTITY2ATTRIBUTE"" (""ENTITY2ATTRIBUTE_ID"", ""ENTITY_ID"", ""ENTITY_ATTRIBUTE_ID"", ""VALUE"",
""VALUETYPE_ID"")
values(""ENTITY2ATTRIBUTE_SEQ"".nextval, :p_entityId, :p_attrId, :p_val, 3)";

            return
                WithConnection(db => db.Execute(q, new { p_entityId = entityId, p_attrId = attrId, p_val = value }));
            return -1;
        }

        public int AddPurchase(DbPurchaseFull purchase)
        {
            var newId = AddPurchaseEntity();
            AddAttributeValueByCode(newId, "PlanYear", purchase.PlanYear.ToString());
            return newId;
        }

        public IPurchaseRepository Use(DbConnection connection)
        {
            Connection = connection;
            return this;
        }

        public List<DbPurchaseNotification> GetPurchaseNotifications()
        {
            var q = @"select ENTITY_ID, 5788 Src_id, 5794 SummTotal, 5789 SourceSystem from
(select * from ENTITY2ATTRIBUTE where ENTITY_ID in
(select ENTITY_ID from ENTITY WHERE ENTITY_TYPE_ID = 5048139))  a
pivot(max(VALUE) for ENTITY_ATTRIBUTE_ID in (5788, 5794, 5789))
                group by ENTITY_ID, 5788, 5794, 5789";

            return
                WithConnection(db => db.Query<DbPurchaseNotification>(q).ToList());
        }
    }
}
