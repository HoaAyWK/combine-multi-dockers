using System.ComponentModel.DataAnnotations;

namespace SM.API.DTOs.Student;

public class UpdateStudentRequest
{   
    [Required]
    public string FirstName { get; set; } = default!;

    [Required]
    public string LastName { get; set; } = default!;

    [Required]
    public string Email { get; set; } = default!;

    [Required]
    public string Gender { get; set; } = default!;

    public DateTime DateOfBirth { get; set; }

    public IFormFile? Avatar { get; set; }
}
