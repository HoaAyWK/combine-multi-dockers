using SM.Core.Entities;
using SM.Core.Interfaces.Services;
using SM.Core.Interfaces.UoW;

namespace SM.Core.Services;

public class SubjectService : ISubjectService
{
    private readonly IUnitOfWork _unitOfWork;

    public SubjectService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Subject>> GetAsync()
    {
        return await _unitOfWork.Subjects.GetAllAsync();
    }

    public async Task<Subject?> GetByIdAsync(int subjectId)
    {
        var subject = await _unitOfWork.Subjects.GetByIdAsync(subjectId);

        if (subject == null)
            return null;

        return subject;
    }

    public async Task<Subject?> CreateAsync(Subject subject)
    {
        var existingSubject = await _unitOfWork.Subjects.GetSubjectByNameAsync(subject.Name);

        if (existingSubject != null) {
            return null;
        }

        var result = await _unitOfWork.Subjects.AddAsync(subject);

        await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<Subject?> UpdateAsync(int id, string name, int numOfCredits)
    {
        var existingSubject = await _unitOfWork.Subjects.GetByIdAsync(id);

        if (existingSubject == null)
        {
            return null;
        }

        existingSubject.Update(name, numOfCredits);
        await _unitOfWork.SaveChangesAsync();

        return existingSubject;
    }
    public async Task<bool> DeleteAsync(int subjectId)
    {
        var subjectToDelete = await _unitOfWork.Subjects.GetByIdAsync(subjectId);

        if (subjectToDelete == null)
        {
            return false;
        }

        _unitOfWork.Subjects.Delete(subjectToDelete);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

}