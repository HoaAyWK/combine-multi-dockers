using SM.Core.Entities;

namespace SM.Core.Interfaces.Services;

public interface IStudentService
{
    Task<IEnumerable<Student>> GetAsync();
    Task<Student?> GetByIdAsync(int studentId);
    Task<Student?> CreateAsync(Student student);
    Task<Student?> UpdateAsync(
        int id,
        string firstName,
        string lastName,
        string email,
        DateTime birthDay,
        string gender);
    Task<bool> DeleteAsync(int studentId);
}