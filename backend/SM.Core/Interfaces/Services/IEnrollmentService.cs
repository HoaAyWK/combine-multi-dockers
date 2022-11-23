using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface IEnrollmentService
{
    Task<IEnumerable<Enrollment>> GetAsync();
    Task<Enrollment?> GetByIdAsync(int entrollmentId);
    Task<Enrollment?> CreateAsync(Enrollment enrollment);
    Task<string> DeleteAsync(int entrollmentId);
}