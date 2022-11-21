using SM.API.DTOs.Course;
using SM.API.DTOs.Student;

namespace SM.API.DTOs.Enrollment;

public class EnrollmentDto
{
    public int Id { get; set; }
    
    public StudentDto Student { get; set; } = default!;

    public CourseDto Course { get; set; } = default!;
}