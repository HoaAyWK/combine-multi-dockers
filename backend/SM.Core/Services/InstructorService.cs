using SM.Core.Entities;
using SM.Core.Interfaces.Services;
using SM.Core.Interfaces.UoW;

namespace SM.Core.Services;

public class InstructorService : IInstructorService
{
    private readonly IUnitOfWork _unitOfWork;

    public InstructorService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Instructor>> GetAsync()
    {
        return await _unitOfWork.Instructors.GetAllAsync();
    }

    public async Task<Instructor?> GetByIdAsync(int instructorId)
    {
        return await _unitOfWork.Instructors.GetByIdAsync(instructorId);
    }

    public async Task<Instructor?> CreateAsync(
        string firstName,
        string lastName,
        string email,
        string phone,
        DateTime birthDay,
        string? avatar)
    {
        var instructor = new Instructor(
            firstName,
            lastName,
            email,
            phone,
            birthDay,
            avatar
        );

        var result = await _unitOfWork.Instructors.AddAsync(instructor);

        if (result == null)
            return null;

        await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<Instructor?> UpdateAsync(
        int id,
        string firstName,
        string lastName,
        string? avatar,
        string email,
        string phone,
        DateTime birthDay,
        string status)
    {
        var existringInstructor = await _unitOfWork.Instructors.GetByIdAsync(id);

        if (existringInstructor == null)
            return null;

        existringInstructor.Update(
            firstName,
            lastName,
            email,
            phone,
            birthDay,
            status
        );

        if (avatar != null) {
            existringInstructor.UpdateAvatar(avatar);
        } 

        await _unitOfWork.SaveChangesAsync();

        return existringInstructor;
    }

    public async Task<bool> DeleteAsync(int instructorId)
    {
        var instructorToDelete = await _unitOfWork.Instructors.GetByIdAsync(instructorId);

        if (instructorToDelete == null)
            return false;
        
        _unitOfWork.Instructors.Delete(instructorToDelete);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }
}
