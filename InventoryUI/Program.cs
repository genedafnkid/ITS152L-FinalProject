using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using ItemDataLibrary.Data;
using ItemDataLibrary.Database;
using ItemDataLibrary.Models;


namespace InventoryUI
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SqlData db = GetConnection();

            ListItem(db);
            Console.WriteLine("Press Enter to exit...");
            Console.ReadLine();
        }

        static SqlData GetConnection()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");

            IConfiguration configuration = builder.Build();
            ISqlDataAccess dbAccess = new SqlDataAccess(configuration);
            SqlData db = new SqlData(dbAccess);

            return db;
        }

        public static void AddItem(SqlData db)
        {
            Console.Write("Enter Product Name: ");
            var name = Console.ReadLine();

            Console.Write("Enter Product Code: ");
            var code = Console.ReadLine();

            Console.Write("Enter Product Brand: ");
            var brand = Console.ReadLine();

            Console.Write("Enter Product Unit Price: ");
            var priceInput = Console.ReadLine();
                
            if (decimal.TryParse(priceInput, out decimal price))
            {
                db.AddItem(name, code, brand, price);
                Console.WriteLine("Item added successfully.");
            }
            else
            {
                Console.WriteLine("Invalid input for Unit Price. Please enter a valid decimal number.");
            }

        }

        public static void ListItem(SqlData db)
        {
            List<ListItem> items = db.ListItems();
            foreach(ListItem item in  items)
            {
                Console.WriteLine($"{item.Id}. Item Name: {item.Name}");
                Console.WriteLine($"{item.Brand}");
                Console.WriteLine($"{item.Code}");
                Console.WriteLine($"${item.UnitPrice}");
                Console.WriteLine();


            }
        }
    }
}
