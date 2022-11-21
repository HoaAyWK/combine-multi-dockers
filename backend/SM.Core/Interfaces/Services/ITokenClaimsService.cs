namespace SM.Core.Interfaces.Services;

public interface ITokenClaimsService
{
    Task<string> GetTokenAsync(string userName);
}