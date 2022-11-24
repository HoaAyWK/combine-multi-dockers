using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface ICourseService
{
    Task<IEnumerable<Course>> GetAsync();
    Task<Course?> GetByIdAsync(int courseId);
    Task<bool> IsAnyCourseWithInstructorAsync(int instructorId);
    Task<bool> IsAnyCourseWithSemesterAsync(int instructorId);
    Task<bool> IsAnyCourseWithSubjectAsync(int instructorId);
    Task<Course?> CreateAsync(Course course);
    Task<Course?> UpdateAsync(int id, int instructorId, int subjectId, int semesterId);
    Task<bool> DeleteAsync(int courseId);
}