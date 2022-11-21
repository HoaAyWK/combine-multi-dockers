using System.Reflection;
using Microsoft.EntityFrameworkCore;
using SM.Core.Entities;

namespace SM.Infrastructure.Data;

public class StudentManagementContext : DbContext
{
    public StudentManagementContext(DbContextOptions<StudentManagementContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public DbSet<Student> Students { get; set; } = default!;

    public DbSet<Course> Courses { get; set; } = default!;

    public DbSet<Subject> Subjects { get; set; } = default!;

    public DbSet<Instructor> Instructors { get; set; } = default!;

    public DbSet<Enrollment> Enrollments { get; set; } = default!;

    public DbSet<Semester> Semesters { get; set; } = default!;

    public DbSet<Grade> Grades { get; set; } = default!;
}