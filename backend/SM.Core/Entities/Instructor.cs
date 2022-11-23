using SM.Core.Constants;

namespace SM.Core.Entities;

public class Instructor : BaseEntity
{
    public string FirstName { get; private set; } = default!;

    public string LastName { get; private set; } = default!;

    public string Email { get; private set; } = default!;

    public string Phone { get; private set; } = default!;

    public string? Avatar { get; private set; }

    public DateTime DateOfBirth { get; private set; }

    public DateTime DateJoin { get; private set; } = DateTime.UtcNow;

    public string Status { get; private set; } = InstructorStatus.ACTIVE;

    public Instructor(
        string firstName,
        string lastName,
        string email,
        string phone,
        DateTime dateOfBirth,
        string? avatar)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Phone = phone;
        DateOfBirth = dateOfBirth;
        Avatar = avatar;
    }

    public void Update(
        string firstName,
        string lastName,
        string email,
        string phone,
        DateTime dateOfBirth,
        string status)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Phone = phone;
        DateOfBirth = dateOfBirth;
        Status = status;
    }

    public void UpdateAvatar(string avatar)
    {
        Avatar = avatar;
    }
}