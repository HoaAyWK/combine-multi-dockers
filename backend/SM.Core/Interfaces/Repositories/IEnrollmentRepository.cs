using SM.Core.Entities;

namespace SM.Core.Interfaces.Repositories;

public interface IEnrollmentRepository : IGenericRepository<Enrollment>
{
    Task<Enrollment?> GetEnrollmentByCourseAndStudentAsync(int courseId, int studentId);
}