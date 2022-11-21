namespace SM.API.DTOs.Instructor;

public class UpdateInstructorResponse
{
    public int Id { get; set; }

    public string FirstName { get; private set; } = default!;

    public string LastName { get; private set; } = default!;

    public string Email { get; private set; } = default!;

    public string Phone { get; private set; } = default!;

    public DateTime DateOfBirth { get; private set; }

    public DateTime DateJoin { get; private set; }

    public string Status { get; private set; } = string.Empty;
}
