using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SM.API.DTOs.Auth;
using SM.Core.Interfaces.Services;
using SM.Infrastructure.Identity;

namespace SM.API.Controllers.v1;

public class AuthController : BaseController
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly ITokenClaimsService _tokenClaimsService;

    public AuthController(
        SignInManager<User> signInManager,
        UserManager<User> userManager,
        ITokenClaimsService tokenClaimsService)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _tokenClaimsService = tokenClaimsService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(AuthRequest request)
    {
        var response = new AuthResponse();
        var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, true);

        response.Result = result.Succeeded;
        response.Username = request.Username;

        if (result.Succeeded)
        {
            response.Token = await _tokenClaimsService.GetTokenAsync(request.Username);

            return Ok(response);
        }

        response.Messages = new List<string>{ "Invalid email or password" };
        
        return BadRequest(response);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(AuthRequest request)
    {
        var response = new AuthResponse();
        var userExist = await _userManager.FindByEmailAsync(request.Username);

        if (userExist != null)
        {
            response.Messages = new List<string> { "Email already in use." };
            
            return BadRequest(response);
        }

        var user = new User()
        {
            Email = request.Username,
            UserName = request.Username,
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (result.Succeeded)
        {
            response.Username = request.Username;
            response.Result = true;
            response.Token = await _tokenClaimsService.GetTokenAsync(request.Username);

            return Ok(response);
        }

        response.Messages = result.Errors.Select(e => e.Description).ToList();
        
        return BadRequest(response);
    }
}