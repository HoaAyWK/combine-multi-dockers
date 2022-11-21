namespace SM.API.Configurations;

public static class ConfigureApiServices
{
    public static IServiceCollection AddApiServices(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(typeof(MappingProfile).Assembly);
        
        return services;
    }
}
