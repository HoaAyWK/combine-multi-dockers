namespace SM.API.DTOs.Auth;

public class AuthResponse
{
    public bool Result { get; set; } = false;

    public string Token { get; set; } = string.Empty;

    public string Username { get; set; } = string.Empty;

    public List<string>? Messages { get; set; }
}