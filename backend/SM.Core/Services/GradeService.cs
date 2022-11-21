using SM.Core.Entities;
using SM.Core.Interfaces.Services;
using SM.Core.Interfaces.UoW;

namespace SM.Core.Services;

public class GradeService : IGradeService
{
    private readonly IUnitOfWork _unitOfWork;

    public GradeService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Grade>> GetAsync()
    {
        return await _unitOfWork.Grades.GetAllAsync();
    }

    public async Task<Grade?> GetByIdAsync(int gradeId)
    {
        return await _unitOfWork.Grades.GetByIdAsync(gradeId);
    }

    public async Task<Grade?> CreateAsync(Grade grade)
    {
        var existingEnrollment = await _unitOfWork.Enrollments
            .GetEnrollmentByCourseAndStudentAsync(grade.CourseId, grade.StudentId);

        if (existingEnrollment == null)
        {
            return null;
        }

        var existingGrade = await _unitOfWork.Grades.GetGradeByCourseAndStudentAsync(grade.CourseId, grade.StudentId);

        if (existingGrade != null)
        {
            existingGrade.UpdateScore(grade.Score);
            await _unitOfWork.SaveChangesAsync();

            return existingGrade;
        }

        var result = await _unitOfWork.Grades.AddAsync(grade);
        await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<bool> DeleteAsync(int gradeId)
    {
        var gradeToDelete = await _unitOfWork.Grades.GetByIdAsync(gradeId);

        if (gradeToDelete == null)
            return false;
        
        _unitOfWork.Grades.Delete(gradeToDelete);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }
}
