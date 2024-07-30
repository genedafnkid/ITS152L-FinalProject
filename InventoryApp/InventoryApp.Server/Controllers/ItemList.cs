using ItemDataLibrary.Data;
using ItemDataLibrary.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InventoryApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemList : ControllerBase
    {
        private ISqlData _db;

        public ItemList(ISqlData db)
        {
            _db = db;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult ListItems()
        {
            List<ListItem> items = _db.ListItems();
            return Ok(items);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public ActionResult DeleteItem(int id)
        {
            _db.DeleteItem(id);
            return Ok(new { message = "Item Deleted!" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateItem(int id, [FromBody] ItemModel model)
        {
            model.Id = id; 
            _db.UpdateItem(model.Id, model.productName, model.Code, model.Brand, model.UnitPrice);
            return NoContent(); 
        }

    }
}
