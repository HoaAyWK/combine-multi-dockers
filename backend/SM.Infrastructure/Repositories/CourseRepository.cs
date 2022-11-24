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

    public async Task<bool> IsAnyCourseWithInstructorAsync(int instructorId)
    {
        return await dbSet.Where(c => c.InstructorId == instructorId).AnyAsync();
    }

    public async Task<bool> IsAnyCourseWithSemesterAsync(int semesterId)
    {
        return await dbSet.Where(c => c.SemesterId == semesterId).AnyAsync();
    }

    public async Task<bool> IsAnyCourseWithSubjectAsync(int subjectId)
    {
        return await dbSet.Where(c => c.SubjectId == subjectId).AnyAsync();
    }
}