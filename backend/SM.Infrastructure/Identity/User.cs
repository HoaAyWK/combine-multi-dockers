using Microsoft.AspNetCore.Identity;

namespace SM.Infrastructure.Identity;

public class User : IdentityUser
{
    public string? Avatar { get; private set; }
}