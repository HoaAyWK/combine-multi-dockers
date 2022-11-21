using Microsoft.EntityFrameworkCore;
using SM.Core.Entities;
using SM.Core.Interfaces.Repositories;
using SM.Infrastructure.Data;

namespace SM.Infrastructure.Repositories;

public class EnrollmentRepository : GenericRepository<Enrollment>, IEnrollmentRepository
{
    public EnrollmentRepository(StudentManagementContext context) : base(context)
    {
    }

    public override async Task<IEnumerable<Enrollment>> GetAllAsync()
    {
        return await dbSet.Include(e => e.Course)
                .ThenInclude(c => c!.Subject)
            .Include(e => e.Course)
                .ThenInclude(c => c!.Semester)
            .Include(e => e.Course)
                .ThenInclude(c => c!.Instructor)
            .Include(e => e.Student)
            .AsNoTracking()
            .ToListAsync();
    }

    public override async Task<Enrollment?> GetByIdAsync(int id)
    {
        return await dbSet.Where(e => e.Id == id)
            .Include(e => e.Course)
                .ThenInclude(c => c!.Subject)
            .Include(e => e.Course)
                .ThenInclude(c => c!.Semester)
            .Include(e => e.Course)
                .ThenInclude(c => c!.Instructor)
            .Include(e => e.Student)
            .FirstOrDefaultAsync();
    }

    public async Task<Enrollment?> GetEnrollmentByCourseAndStudentAsync(int courseId, int studentId)
    {
        return await dbSet
            .Where(x => x.CourseId == courseId && x.StudentId == studentId)
            .FirstOrDefaultAsync();
    }
}