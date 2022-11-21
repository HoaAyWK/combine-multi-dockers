namespace SM.Core.Entities;

public class Student : BaseEntity
{
    public string FirstName { get; private set; } = default!;

    public string LastName { get; private set; } = default!;

    public string Email { get; private set; } = default!;

    public DateTime DateOfBirth { get; private set; }

    public string Gender { get; private set; } = default!;

    public List<Enrollment>? Enrollments { get; private set; }

    public List<Grade>? Grades { get; private set; }

    private Student()
    {
    }
    
    public Student(
        string firstName,
        string lastName,
        string email,
        DateTime dateOfBirth,
        string gender)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        DateOfBirth = dateOfBirth;
        Gender = gender;
    }

    public void Update(
        string firstName,
        string lastName,
        string email,
        DateTime dateOfBirth,
        string gender)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        DateOfBirth = dateOfBirth;
        Gender = gender;
    }
}