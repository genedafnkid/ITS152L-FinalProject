using ItemDataLibrary.Data;
using ItemDataLibrary.Models;
using ItemDataLibrary.Data;
using ItemDataLibrary.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace InventoryApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private IConfiguration _config;

        private ISqlData _db;
        public LoginController(IConfiguration config, ISqlData db)
        {
            _config = config;
            _db = db;
        }

        private string GenerateToken(LoginModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            string userIdStr = user.Id.ToString();
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userIdStr),
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        [AllowAnonymous]
        [HttpPost]
        [Route("/api/Login/login")]
        public ActionResult Login([FromBody] LoginUser login)
        {
            LoginModel user = _db.LoginUser(login.UserName, login.Password);

            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(new { token });
            }

            return Unauthorized("Invalid username or password");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult Register([FromBody] LoginModel user)
        {
            _db.RegisterUser(user.UserName, user.FirstName, user.LastName, user.Password);
            return Ok(new { message = "User Registered" });
        }

        [AllowAnonymous]
        [HttpGet("list")]
        public ActionResult ListEmployees()
        {
            List<ListEmployee> employees = _db.ListEmployees();
            return Ok(employees);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public ActionResult DeleteEmployee(int id)
        {
            _db.DeleteEmployee(id);
            return Ok(new { message = "Employee Deleted!" });
        }






    }
}
