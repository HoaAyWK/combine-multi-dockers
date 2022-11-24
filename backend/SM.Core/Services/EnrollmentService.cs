using SM.Core.Entities;
using SM.Core.Interfaces.Services;
using SM.Core.Interfaces.UoW;
using SM.Core.Constants;

namespace SM.Core.Services;

public class EnrollmentService : IEnrollmentService
{
    private readonly IUnitOfWork _unitOfWork;

    public EnrollmentService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Enrollment>> GetAsync()
    {
        return await _unitOfWork.Enrollments.GetAllAsync();
    }

    public async Task<Enrollment?> GetByIdAsync(int enrollmentId)
    {
        return await _unitOfWork.Enrollments.GetByIdAsync(enrollmentId);
    }

    public async Task<Enrollment?> GetByCourseIdAndStudentId(int courseId, int studentId)
    {
        return await _unitOfWork.Enrollments.GetEnrollmentByCourseAndStudentAsync(courseId, studentId);
    }

    public async Task<bool> IsAnyEnrollmentWithStudentAsync(int studentId)
    {
        return await _unitOfWork.Enrollments.IsAnyEnrollmentWithStudentAsync(studentId);
    }

    public async Task<bool> IsAnyEnrollmentWithCourseAsync(int courseId)
    {
        return await _unitOfWork.Enrollments.IsAnyEnrollmentWithCourseAsync(courseId);
    }

    public async Task<Enrollment?> CreateAsync(Enrollment enrollment)
    {
        var existingEnrollment = await _unitOfWork.Enrollments
            .GetEnrollmentByCourseAndStudentAsync(enrollment.CourseId, enrollment.StudentId);
        
        if (existingEnrollment != null) {
            return null;
        }

        var result = await _unitOfWork.Enrollments.AddAsync(enrollment);

        await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<bool> DeleteAsync(int enrollmentId)
    {
        var enrollmentToDelete = await _unitOfWork.Enrollments.GetByIdAsync(enrollmentId);

        if (enrollmentToDelete == null)
        {
            return false;
        }
        
        _unitOfWork.Enrollments.Delete(enrollmentToDelete);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }
}
