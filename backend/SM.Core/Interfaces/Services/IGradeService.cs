using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface IGradeService
{
    Task<IEnumerable<Grade>> GetAsync();
    Task<Grade?> GetByIdAsync(int entrollmentId);
    Task<Grade?> CreateAsync(Grade grade);
    Task<bool> DeleteAsync(int gradeId);
}