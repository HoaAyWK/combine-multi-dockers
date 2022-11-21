using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface ISemesterService
{
    Task<IEnumerable<Semester>> GetAsync();
    Task<Semester?> GetByIdAsync(int semesterId);
    Task<Semester?> CreateAsync(Semester request);
    Task<Semester?> UpdateAsync(int id, string name);
    Task<bool> DeleteAsync(int semesterId);
}