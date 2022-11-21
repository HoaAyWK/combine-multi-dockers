using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface ISubjectService
{
    Task<IEnumerable<Subject>> GetAsync();
    Task<Subject?> GetByIdAsync(int subjectId);
    Task<Subject?> CreateAsync(Subject request);
    Task<Subject?> UpdateAsync(int id, string name, int numOfCredits);
    Task<bool> DeleteAsync(int subjectId);
}