using Microsoft.EntityFrameworkCore;
using SM.Core.Entities;
using SM.Core.Interfaces.Repositories;
using SM.Infrastructure.Data;

namespace SM.Infrastructure.Repositories;

public class SemesterRepository : GenericRepository<Semester>, ISemesterRepository
{
    public SemesterRepository(StudentManagementContext context) : base(context)
    {
    }

    public async Task<Semester?> GetSemesterByNameAsync(string name)
    {
        return await dbSet.Where(x => x.Name == name).FirstOrDefaultAsync();
    }
}