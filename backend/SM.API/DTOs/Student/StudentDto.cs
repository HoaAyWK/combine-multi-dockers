namespace SM.API.DTOs.Student;

public class StudentDto
{
    public int Id { get; set; }

    public string FirstName { get; set; } = default!;

    public string LastName { get; set; } = default!;

    public string Email { get; set; } = default!;

    public string Gender { get; set; } = default!;

    public string? Avatar { get; set; }

    public DateTime DateOfBirth { get; set; }
}