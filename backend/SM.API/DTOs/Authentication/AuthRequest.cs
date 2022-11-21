namespace SM.API.DTOs.Auth;

public class AuthRequest
{
    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}