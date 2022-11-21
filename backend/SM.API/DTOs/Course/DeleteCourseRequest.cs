namespace SM.API.DTOs.Course;

public class DeleteCourseRequest
{
    public int CourseId { get; init; }

    public DeleteCourseRequest(int courseId)
    {
        CourseId = courseId;
    }
}