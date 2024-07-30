using ItemDataLibrary.Database;
using ItemDataLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemDataLibrary.Data
{
    public class SqlData : ISqlData
    {
        private ISqlDataAccess _db;
        private const string connectionStringName = "SqlDb";

        public SqlData(ISqlDataAccess db)
        {
            _db = db;
        }

        public void AddItem(string Name, string Code, string Brand, decimal UnitPrice)
        {
            _db.SaveData<dynamic>(
                "dbo.Item_Add",
                new { Name, Code, Brand, UnitPrice },
                connectionStringName,
                true);
        }

        public List<ListItem> ListItems()
        {
            return _db.LoadData<ListItem, dynamic>("dbo.Item_List", new { }, connectionStringName, true).ToList();
        }

        public void DeleteItem(int id)
        {
            _db.SaveData<dynamic>("dbo.Item_Delete", new { Id = id }, connectionStringName, true);
        }

        public void RegisterUser(string username, string firstName, string lastName, string password)
        {
            _db.SaveData<dynamic>(
                "dbo.Login_Register",
                new { username, firstName, lastName, password },
                connectionStringName,
                true);
        }

        public LoginModel LoginUser(string username, string password)
        {
            LoginModel result = _db.LoadData<LoginModel, dynamic>("dbo.Login_Authenticate", new { username, password }, connectionStringName, true).FirstOrDefault();

            return result;
        }

        public void UpdateItem(int id, string productName, string code, string brand, decimal unitPrice)
        {
            _db.SaveData<dynamic>(
                "dbo.Item_Update",
                new { Id = id, Name = productName, Code = code, Brand = brand, UnitPrice = unitPrice },
                connectionStringName,
                true);
        }

        public List<ListEmployee> ListEmployees()
        {
            return _db.LoadData<ListEmployee, dynamic>("dbo.List_Employees", new { }, connectionStringName, true).ToList();
        }

        public void DeleteEmployee(int id)
        {
            _db.SaveData<dynamic>("dbo.Employee_Delete", new { Id = id }, connectionStringName, true);
        }

    }
}
