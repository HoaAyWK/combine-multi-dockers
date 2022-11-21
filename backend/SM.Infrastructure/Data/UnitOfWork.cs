using SM.Core.Interfaces.Repositories;
using SM.Core.Interfaces.UoW;
using SM.Infrastructure.Repositories;

namespace SM.Infrastructure.Data;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly StudentManagementContext _context;

    public IStudentRepository Students { get; private set; } = null!;
    
    public IInstructorRepository Instructors { get; private set; } = null!;

    public ISubjectRepository Subjects { get; private set; } = null!;

    public ISemesterRepository Semesters { get; private set; } = null!;

    public ICourseRepository Courses { get; private set; } = null!;

    public IEnrollmentRepository Enrollments { get; private set; } = null!;

    public IGradeRepository Grades { get; private set; } = null!;

    public UnitOfWork(StudentManagementContext context)
    {
        _context = context;
        Subjects = new SubjectRepository(_context);
        Students = new StudentRepository(_context);
        Instructors = new InstructorRepository(_context);
        Semesters = new SemesterRepository(_context);
        Courses = new CourseRepository(_context);
        Enrollments = new EnrollmentRepository(_context);
        Grades = new GradeRepository(_context);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    private bool _disposed = false;

    protected virtual void Dispose(bool disposing)
    {
        if (!this._disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }

            this._disposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}