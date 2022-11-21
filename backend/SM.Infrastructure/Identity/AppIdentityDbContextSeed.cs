using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace SM.Infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedAsync(AppIdentityDbContext identityDbContext, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {

        if (identityDbContext.Database.IsSqlServer())
        {
            identityDbContext.Database.Migrate();
        }

        await roleManager.CreateAsync(new IdentityRole("Admin"));

        var defaultUser = new User { UserName = "demouser@gmail.com", Email = "demouser@gmail.com" };
        await userManager.CreateAsync(defaultUser, "Password123!");

        string adminUserName = "admin@gmail.com";
        var adminUser = new User { UserName = adminUserName, Email = adminUserName };
        await userManager.CreateAsync(adminUser, "Password123!");
        adminUser = await userManager.FindByNameAsync(adminUserName);
        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}