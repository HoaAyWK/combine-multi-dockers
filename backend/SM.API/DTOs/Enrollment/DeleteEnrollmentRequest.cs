namespace SM.API.DTOs.Enrollment;

public class DeleteEnrollmentRequest
{
    public int EnrollmentId { get; init; }

    public DeleteEnrollmentRequest(int enrollmentId)
    {
        EnrollmentId = enrollmentId;
    }
}