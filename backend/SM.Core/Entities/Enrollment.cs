namespace SM.Core.Entities;

public class Enrollment : BaseEntity
{
    public int CourseId { get; private set; }

    public Course? Course { get; private set; }

    public int StudentId { get; private set; }

    public Student? Student { get; private set; }

    private Enrollment()
    {
    }

    public Enrollment(int courseId, int studentId)
    {
        CourseId = courseId;
        StudentId = studentId;

    }
}