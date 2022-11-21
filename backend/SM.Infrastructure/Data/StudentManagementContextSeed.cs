using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SM.Core.Entities;

namespace SM.Infrastructure.Data;

public class StudentManagementContextSeed
{
    public static async Task SeedAsync(StudentManagementContext context, ILogger logger, int retry = 0)
    {
        var retryForAvailability  = retry;

        try
        {
            context.Database.Migrate();

            if (!await context.Subjects.AnyAsync())
            {
                await context.Subjects.AddRangeAsync(GetPreconfiguredSubjects());
                await context.SaveChangesAsync();
            }

            if (!await context.Students.AnyAsync())
            {
                await context.Students.AddRangeAsync(GetPreconfiguredStudents());
                await context.SaveChangesAsync();
            }

            if (!await context.Instructors.AnyAsync())
            {
                await context.Instructors.AddRangeAsync(GetPreconfiguredInstructors());
                await context.SaveChangesAsync();
            }

            if (!await context.Semesters.AnyAsync())
            {
                await context.Semesters.AddRangeAsync(GetPreconiguredSemesters());
                await context.SaveChangesAsync();
            }

            if (!await context.Courses.AnyAsync())
            {
                await context.Courses.AddRangeAsync(GetPreconfiuredCourses());
                await context.SaveChangesAsync();
            }

            if (!await context.Enrollments.AnyAsync())
            {
                await context.Enrollments.AddRangeAsync(GetPreconfiguredEnrollments());
                await context.SaveChangesAsync();
            }

            if (!await context.Grades.AnyAsync())
            {
                await context.Grades.AddRangeAsync(GetPreconfiguredGrades());
                await context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            if (retryForAvailability >= 10) throw;

            retryForAvailability++;
            
            logger.LogError(ex.Message);
            await SeedAsync(context, logger, retryForAvailability);
            throw;
        }
    }

    static IEnumerable<Subject> GetPreconfiguredSubjects()
    {
        return new List<Subject>
            {
                new("Web Progamming", 3),
                new("Windows Progamming", 3),
                new("OOP", 3),
                new("Operating System", 3),
                new("Design Patterns", 3),
                new("AI", 3),
                new("Machine Learning", 3),
                new("Mobile Progamming", 3)
            };
    }

    static IEnumerable<Student> GetPreconfiguredStudents()
    {
        return new List<Student>
            {
                new("Nguyen", "An", "123@gmail.com", new DateTime(2000, 10, 12), "Male"),
                new("Le", "Hoang", "124@gmail.com", new DateTime(2001, 7, 30), "Male"),
                new("Tran", "Long", "125@gmail.com", new DateTime(2002, 4, 20), "Male"),
                new("Nguyen", "Duc", "126@gmail.com", new DateTime(2000, 10, 21), "Male"),
                new("Do", "Binh", "127@gmail.com", new DateTime(2001, 12, 15), "Male"),
                new("Nguyen", "Giang", "128@gmail.com", new DateTime(2003, 1, 11), "Male"),
                new("Nguyen", "Loc", "129@gmail.com", new DateTime(2002, 8, 1), "Male"),
                new("Tran", "Linh", "130@gmail.com", new DateTime(2001, 10, 5), "Male"),
                new("Nguyen", "Quy", "131@gmail.com", new DateTime(2000, 11, 9), "Male"),
            };
    }

    static IEnumerable<Instructor> GetPreconfiguredInstructors()
    {
        return new List<Instructor>
            {
                new("Do", "Hop", "1@gmail.com", "123213213213", new DateTime(1980, 12, 21)),
                new("Nguyen", "Dang", "2@gmail.com", "3131236762", new DateTime(1985, 5, 26)),
                new("Tran", "Quang", "3@gmail.com", "01033123123", new DateTime(1977, 10, 22)),
                new("Nguyen", "Cuong", "4@gmail.com", "87651567", new DateTime(1980, 4, 11)),
            };
    }

    static IEnumerable<Semester> GetPreconiguredSemesters()
    {
        return new List<Semester>
            {
                new Semester("HK1 2022"),
                new Semester("HK2 2022"),
                new Semester("HK3 2022")
            };
    }

    static IEnumerable<Course> GetPreconfiuredCourses()
    {
        return new List<Course>
            {
                new Course(1, 1, 1),
                new Course(2, 2, 1),
                new Course(1, 2, 1),
                new Course(1, 3, 1),
                new Course(3, 4, 1),
                new Course(3, 2, 2)
            };
    }

    static IEnumerable<Enrollment> GetPreconfiguredEnrollments()
    {
        return new List<Enrollment>
            {
                new Enrollment(1, 1),
                new Enrollment(1, 2),
                new Enrollment(1, 3),
                new Enrollment(1, 4),
                new Enrollment(1, 5),
                new Enrollment(2, 1),
                new Enrollment(2, 2),
                new Enrollment(2, 6)
            };
    }

    static IEnumerable<Grade> GetPreconfiguredGrades()
    {
        return new List<Grade>
            {
                new Grade(1, 1, 7.8),
                new Grade(2, 1, 9.0),
                new Grade(3, 1, 8.2)
            };
    }
}