using SM.Core.Entities;

namespace SM.Core.Interfaces.Repositories;

public interface ICourseRepository : IGenericRepository<Course>
{
    Task<bool> IsAnyCourseWithInstructorAsync(int instructorId);
    Task<bool> IsAnyCourseWithSemesterAsync(int semesterId);
    Task<bool> IsAnyCourseWithSubjectAsync(int subjectId);
}