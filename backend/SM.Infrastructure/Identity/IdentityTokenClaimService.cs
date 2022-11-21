using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SM.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SM.Core.Interfaces.Services;

namespace SM.Infrastructure.Identity;

public class IdentityTokenClaimService : ITokenClaimsService
{
    private readonly UserManager<User> _userManager;
    private readonly JwtConfig _jwtConfig;

    public IdentityTokenClaimService(
        UserManager<User> userManager,
        IOptionsMonitor<JwtConfig> optionsMonitor)
    {
        _userManager = userManager;
        _jwtConfig = optionsMonitor.CurrentValue;
    }

    public async Task<string> GetTokenAsync(string userName)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
        var user = await _userManager.FindByNameAsync(userName);
        var roles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, userName) };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims.ToArray()),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}