using Microsoft.EntityFrameworkCore;
using SM.Core.Entities;
using SM.Core.Interfaces.Repositories;
using SM.Infrastructure.Data;

namespace SM.Infrastructure.Repositories;

public class CourseRepository : GenericRepository<Course>, ICourseRepository
{
    public CourseRepository(StudentManagementContext context) : base(context)
    {
    }

    public override async Task<IEnumerable<Course>> GetAllAsync()
    {
        return await dbSet.Include(c => c.Semester)
            .Include(c => c.Instructor)
            .Include(c => c.Subject)
            .AsNoTracking()
            .ToListAsync();
    }

    public override async Task<Course?> GetByIdAsync(int id)
    {
        return await dbSet.Where(c => c.Id == id)
            .Include(c => c.Semester)
            .Include(c => c.Instructor)
            .Include(c => c.Subject)
            .FirstOrDefaultAsync();
    }
}