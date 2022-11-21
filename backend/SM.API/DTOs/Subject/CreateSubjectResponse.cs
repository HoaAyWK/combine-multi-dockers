namespace SM.API.DTOs.Subject;

public class CreateSubjectResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int NumOfCredits { get; set; }
}