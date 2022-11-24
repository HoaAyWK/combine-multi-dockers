using SM.Core.Entities;

namespace SM.Core.Interfaces.Repositories;

public interface IEnrollmentRepository : IGenericRepository<Enrollment>
{
    Task<Enrollment?> GetEnrollmentByCourseAndStudentAsync(int courseId, int studentId);
    Task<bool> IsAnyEnrollmentWithStudentAsync(int studentId);
    Task<bool> IsAnyEnrollmentWithCourseAsync(int courseId);
}