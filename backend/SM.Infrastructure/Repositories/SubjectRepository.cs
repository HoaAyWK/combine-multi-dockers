using Microsoft.EntityFrameworkCore;
using SM.Core.Entities;
using SM.Core.Interfaces.Repositories;
using SM.Infrastructure.Data;

namespace SM.Infrastructure.Repositories;

public class SubjectRepository : GenericRepository<Subject>, ISubjectRepository
{
    public SubjectRepository(StudentManagementContext context) : base(context)
    {
    }

    public async Task<Subject?> GetSubjectByNameAsync(string name)
    {
        return await dbSet.Where(x => x.Name == name).FirstOrDefaultAsync();
    }
}