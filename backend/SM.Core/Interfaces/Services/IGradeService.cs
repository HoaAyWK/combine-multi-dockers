using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface IGradeService
{
    Task<IEnumerable<Grade>> GetAsync();
    Task<Grade?> GetByIdAsync(int entrollmentId);
    Task<Grade?> GetByCourseIdAndStudentId(int courseId, int studentId);
    Task<Grade?> CreateAsync(Grade grade);
    Task<bool> DeleteAsync(int gradeId);
}