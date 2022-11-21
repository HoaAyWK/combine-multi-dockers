namespace SM.Core;

public class JwtConfig
{
    public string Secret { get; set; } = string.Empty;
    public int ExpireDate { get; set; }
}