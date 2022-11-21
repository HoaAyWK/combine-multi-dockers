using SM.Core.Entities;
using SM.Core.Interfaces.Services;
using SM.Core.Interfaces.UoW;

namespace SM.Core.Services;

public class CourseService : ICourseService
{
    private readonly IUnitOfWork _unitOfWork;

    public CourseService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Course>> GetAsync()
    {
        return await _unitOfWork.Courses.GetAllAsync();
    }

    public async Task<Course?> GetByIdAsync(int courseId)
    {
        return await _unitOfWork.Courses.GetByIdAsync(courseId);
    }

    public async Task<Course?> CreateAsync(Course course)
    {
        var result = await _unitOfWork.Courses.AddAsync(course);

        await _unitOfWork.SaveChangesAsync();

        return result;
    }

    public async Task<Course?> UpdateAsync(int id, int instructorId, int subjectId, int semesterId)
    {
        var existingCourse = await _unitOfWork.Courses.GetByIdAsync(id);

        if (existingCourse == null)
        {
            return null;
        }

        existingCourse.UpdateSubject(subjectId);
        existingCourse.UpdateInstructor(instructorId);
        existingCourse.UpdateSemsester(semesterId);

        await _unitOfWork.SaveChangesAsync();

        return existingCourse;
    }
    public async Task<bool> DeleteAsync(int courseId)
    {
        var courseToDelete = await _unitOfWork.Courses.GetByIdAsync(courseId);

        if (courseToDelete == null)
        {
            return false;
        }

        _unitOfWork.Courses.Delete(courseToDelete);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

}