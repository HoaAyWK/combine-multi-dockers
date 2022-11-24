using SM.API.DTOs.Course;
using SM.API.DTOs.Student;

namespace SM.API.DTOs.Grade;

public class CreateGradeResponse
{
    public int Id { get; set; }

    public StudentDto Student { get; set; } = default!;

    public CourseDto Course { get; set; } = default!;

    public double Score { get; set; }
}
