using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SM.Infrastructure.Data;
using SM.Infrastructure.Identity;

namespace SM.Infrastructure;

public static class Dependencies
{
    public static void ConfigureServices(IConfiguration configuration, IServiceCollection services)
    {
        services.AddDbContext<StudentManagementContext>(c =>
            c.UseSqlServer(configuration.GetConnectionString("StudentManagementConnection")));

        // Add Identity DbContext
        services.AddDbContext<AppIdentityDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("IdentityConnection"))); 
    }
}