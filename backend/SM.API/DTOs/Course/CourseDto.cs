using SM.API.DTOs.Instructor;
using SM.API.DTOs.Semester;
using SM.API.DTOs.Subject;

namespace SM.API.DTOs.Course;

public class CourseDto
{
    public int Id { get; set; }

    public InstructorDto Instructor { get; set; } = default!;

    public SubjectDto Subject { get; set; } = default!;

    public SemesterDto Semester { get; set; } = default!;
}