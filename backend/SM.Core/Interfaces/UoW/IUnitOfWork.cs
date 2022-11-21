using SM.Core.Interfaces.Repositories;

namespace SM.Core.Interfaces.UoW;

public interface IUnitOfWork
{
    IStudentRepository Students { get; }
    IInstructorRepository Instructors { get; }
    ISubjectRepository Subjects { get; }
    ISemesterRepository Semesters { get; }
    ICourseRepository Courses { get; }
    IEnrollmentRepository Enrollments { get; }
    IGradeRepository Grades { get; }
    Task SaveChangesAsync();
}