using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using SM.Core.Entities;
using SM.API.DTOs.Enrollment;
using SM.Core.Constants;

namespace SM.API.Controllers.v1;

public class EnrollmentsController : BaseController
{
    private readonly IEnrollmentService _enrollmentService;
    private readonly IGradeService _gradeService;
    private readonly IMapper _mapper;

    public EnrollmentsController(IEnrollmentService enrollmentService, IGradeService gradeService, IMapper mapper)
    {
        _enrollmentService = enrollmentService;
        _gradeService = gradeService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var enrollments = await _enrollmentService.GetAsync();
        var enrollmentDtos = _mapper.Map<IEnumerable<Enrollment>, IEnumerable<EnrollmentDto>>(enrollments);

        return Ok(enrollmentDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var enrollment = await _enrollmentService.GetByIdAsync(id);

        if (enrollment == null) {
            return BadRequest(new { message = "Enrollment not found" });
        }

        var enrollmentDto = _mapper.Map<EnrollmentDto>(enrollment);

        return Ok(enrollmentDto);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateEnrollmentRequest request)
    {
        var enrollment = _mapper.Map<Enrollment>(request);
        var result = await _enrollmentService.CreateAsync(enrollment);

        if (result == null)
        {
            return BadRequest(new { message = $"Enrollment with studentId '{request.StudentId}' and courseId '{request.CourseId}' already exists" });
        }

        var enrollmentDto = _mapper.Map<EnrollmentDto>(result);

        return Ok(enrollmentDto);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete(int id)
    {
        var enrollment = await _enrollmentService.GetByIdAsync(id);

        if (enrollment == null)
        {
            return BadRequest(new { message = "Enrollment not found" });
        }
        var grade = await _gradeService.GetByCourseIdAndStudentId(enrollment.CourseId, enrollment.StudentId);

        if (grade != null)
        {
            return BadRequest(
                new {
                    message = $"Please delete Grade with courseId '{enrollment.CourseId}' and studentId '{enrollment.StudentId}' first!"
                }
            );
        }

        var result = await _enrollmentService.DeleteAsync(id);
        
        return Ok(new DeleteEnrollmentResponse());
    }
}