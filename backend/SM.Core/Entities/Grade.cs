namespace SM.Core.Entities;

public class Grade : BaseEntity
{
    public int StudentId { get; private set; }

    public Student? Student { get; private set; }

    public int CourseId { get; private set; }

    public Course? Course { get; private set; }

    public double Score { get; private set; }


    private Grade()
    {
    }

    public Grade(int studentId, int courseId, double score)
    {
        StudentId = studentId;
        CourseId = courseId;
        Score = score;
    }

    public void UpdateScore(double score)
    {
        Score = score;
    }
}