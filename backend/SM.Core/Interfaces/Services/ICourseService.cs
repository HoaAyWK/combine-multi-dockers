using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface ICourseService
{
    Task<IEnumerable<Course>> GetAsync();
    Task<Course?> GetByIdAsync(int courseId);
    Task<Course?> CreateAsync(Course course);
    Task<Course?> UpdateAsync(int id, int instructorId, int subjectId, int semesterId);
    Task<bool> DeleteAsync(int courseId);
}