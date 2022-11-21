using SM.Core.Entities;
using SM.Core.Interfaces.Services;
using SM.Core.Interfaces.UoW;

namespace SM.Core.Services;

public class SemesterService : ISemesterService
{
    private readonly IUnitOfWork _unitOfWork;

    public SemesterService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Semester>> GetAsync()
    {
        return await _unitOfWork.Semesters.GetAllAsync();
    }

    public async Task<Semester?> GetByIdAsync(int semesterId)
    {
        return await _unitOfWork.Semesters.GetByIdAsync(semesterId);
    }

    public async Task<Semester?> CreateAsync(Semester semester)
    {
        var existingSemester = await _unitOfWork.Semesters.GetSemesterByNameAsync(semester.Name);

        if (existingSemester != null) {
            return null;
        }
        var result = await _unitOfWork.Semesters.AddAsync(semester);

        await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<Semester?> UpdateAsync(int id, string name)
    {
        var existingSemester = await _unitOfWork.Semesters.GetByIdAsync(id);

        if (existingSemester == null)
            return null;

        existingSemester.Update(name);
        await _unitOfWork.SaveChangesAsync();

        return existingSemester;
    }

    public async Task<bool> DeleteAsync(int semesterId)
    {
        var semesterToDelete = await _unitOfWork.Semesters.GetByIdAsync(semesterId);

        if (semesterToDelete == null)
            return false;
        
        _unitOfWork.Semesters.Delete(semesterToDelete);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }
}
