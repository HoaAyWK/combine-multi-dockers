namespace SM.API.DTOs.Student;

public class DeleteStudentRequest
{
    public int StudentId { get; init; }

    public DeleteStudentRequest(int studentId)
    {
        StudentId = studentId;
    }
}