using SM.Core.Entities;
using SM.Core.Interfaces.Services;
using SM.Core.Interfaces.UoW;

namespace SM.Core.Services;

public class StudentService : IStudentService
{
    private readonly IUnitOfWork _unitOfWork;

    public StudentService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Student>> GetAsync()
    {
        return await _unitOfWork.Students.GetAllAsync();
    }

    public async Task<Student?> GetByIdAsync(int studentId)
    {
        return await _unitOfWork.Students.GetByIdAsync(studentId);
    }

    public async Task<Student?> CreateAsync(Student student)
    {
        var result = await _unitOfWork.Students.AddAsync(student);

        if (result == null)
        {
            return null;
        }

        await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<Student?> UpdateAsync(
        int id,
        string firstName,
        string lastName,
        string? avatar,
        string email,
        DateTime birthDay,
        string gender)
    {
        var existingStudent = await _unitOfWork.Students.GetByIdAsync(id);

        if (existingStudent == null)
        {
            return null;
        }

        existingStudent.Update(
            firstName,
            lastName,
            email,
            birthDay,
            gender
        );

        if (avatar != null)
        {
            existingStudent.UpdateAvatar(avatar);
        }

        await _unitOfWork.SaveChangesAsync();

        return existingStudent;
    }
    public async Task<bool> DeleteAsync(int studentId)
    {
        var studentToDelete = await _unitOfWork.Students.GetByIdAsync(studentId);

        if (studentToDelete == null)
        {
            return false;
        }

        _unitOfWork.Students.Delete(studentToDelete);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

}