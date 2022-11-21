using System.ComponentModel.DataAnnotations;

namespace SM.API.DTOs.Subject;

public class UpdateSubjectRequest
{

    [Required]
    public string Name { get; set; } = null!;

    public int NumOfCredits { get; set; }
}