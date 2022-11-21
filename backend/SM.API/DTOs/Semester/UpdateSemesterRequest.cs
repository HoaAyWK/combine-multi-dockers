using System.ComponentModel.DataAnnotations;

namespace SM.API.DTOs.Semester;

public class UpdateSemesterRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;
}