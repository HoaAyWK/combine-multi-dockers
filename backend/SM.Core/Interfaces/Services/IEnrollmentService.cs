using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface IEnrollmentService
{
    Task<IEnumerable<Enrollment>> GetAsync();
    Task<Enrollment?> GetByIdAsync(int entrollmentId);
    Task<Enrollment?> GetByCourseIdAndStudentId(int courseId, int studentId);
    Task<bool> IsAnyEnrollmentWithStudentAsync(int studentId);
    Task<bool> IsAnyEnrollmentWithCourseAsync(int couresId);
    Task<Enrollment?> CreateAsync(Enrollment enrollment);
    Task<bool> DeleteAsync(int entrollmentId);
}