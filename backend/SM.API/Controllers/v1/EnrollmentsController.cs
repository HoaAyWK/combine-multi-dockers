using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using SM.Core.Entities;
using SM.API.DTOs.Enrollment;

namespace SM.API.Controllers.v1;

public class EnrollmentsController : BaseController
{
    private readonly IEnrollmentService _enrollmentService;
    private readonly IMapper _mapper;

    public EnrollmentsController(IEnrollmentService enrollmentService, IMapper mapper)
    {
        _enrollmentService = enrollmentService;
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
            return BadRequest("Enrollment not found");
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
            return BadRequest($"Enrollment with studentId '{request.StudentId}' and courseId '{request.CourseId}' already exists");
        }

        var enrollmentDto = _mapper.Map<EnrollmentDto>(result);

        return Ok(enrollmentDto);
    }

    [HttpDelete]
    [Route("delete")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete([FromQuery] DeleteEnrollmentRequest request)
    {
        var result = await _enrollmentService.DeleteAsync(request.EnrollmentId);

        return Ok(new DeleteEnrollmentResponse());
    }
}