using System.ComponentModel.DataAnnotations;

namespace SM.API.DTOs.Instructor;

public class UpdateInstructorRequest
{
    [Required]
    public string FirstName { get; set; } = default!;

    [Required]
    public string LastName { get; set; } = default!;

    [Required]
    public string Email { get; set; } = default!;

    [Required]
    public string Phone { get; set; } = default!;

    public DateTime DateOfBirth { get; set; }

    [Required]
    public string Status { get; set; } = string.Empty;

    public IFormFile? Avatar { get; set; }
}
