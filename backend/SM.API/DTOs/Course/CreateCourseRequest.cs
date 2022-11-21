namespace SM.API.DTOs.Course;

public class CreateCourseRequest
{
    public int InstructorId { get; set; }

    public int SubjectId { get; set; }

    public int SemesterId { get; set; }
}
