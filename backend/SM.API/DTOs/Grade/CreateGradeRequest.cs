namespace SM.API.DTOs.Grade;

public class CreateGradeRequest
{
    public int StudentId { get; set; }

    public int CourseId { get; set; }

    public double Score { get; set; }
}
