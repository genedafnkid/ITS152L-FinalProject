using ItemDataLibrary.Models;

namespace ItemDataLibrary.Data
{
    public interface ISqlData
    {
        void AddItem(string Name, string Code, string Brand, decimal UnitPrice);
        void DeleteEmployee(int id);
        void DeleteItem(int id);
        List<ListEmployee> ListEmployees();
        List<ListItem> ListItems();
        LoginModel LoginUser(string username, string password);
        void RegisterUser(string username, string firstName, string lastName, string password);
        void UpdateItem(int id, string productName, string code, string brand, decimal unitPrice);
    }
}