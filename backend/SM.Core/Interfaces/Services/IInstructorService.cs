using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface IInstructorService
{
    Task<IEnumerable<Instructor>> GetAsync();
    Task<Instructor?> GetByIdAsync(int instructorId);
    Task<Instructor?> CreateAsync(
        string firstName,
        string lastName,
        string email,
        string phone,
        DateTime birthDay);

    Task<Instructor?> UpdateAsync(
        int id,
        string firstName,
        string lastName,
        string? avatar,
        string email,
        string phone,
        DateTime birthDay,
        string status);
    Task<bool> DeleteAsync(int instructorId);
}