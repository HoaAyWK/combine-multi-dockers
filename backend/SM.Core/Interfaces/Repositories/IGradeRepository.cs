using SM.Core.Entities;

namespace SM.Core.Interfaces.Repositories;

public interface IGradeRepository : IGenericRepository<Grade>
{
    Task<Grade?> GetGradeByCourseAndStudentAsync(int courseId, int studentId);
}