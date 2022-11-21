namespace SM.Core.Entities;

public class Course : BaseEntity
{
    public int SubjectId { get; private set; }

    public Subject? Subject { get; private set; }

    public int InstructorId { get; private set; }

    public Instructor? Instructor { get; private set; }

    public int SemesterId { get; private set; }

    public Semester? Semester { get; private set; }


    public List<Enrollment>? Enrollments { get; private set; }

    public List<Grade>? Grades { get; private set; }

    private Course()
    {
    }

    public Course(int subjectId, int instructorId, int semesterId)
    {
        SubjectId = subjectId;
        InstructorId = instructorId;
        SemesterId = semesterId;
    }

    public void UpdateSubject(int subjectId)
    {
        SubjectId = subjectId;
    }

    public void UpdateInstructor(int instructorId)
    {
        InstructorId = instructorId;
    }

    public void UpdateSemsester(int semesterId)
    {
        SemesterId = semesterId;
    }
}