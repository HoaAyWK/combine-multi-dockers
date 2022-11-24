using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using SM.Core.Entities;
using SM.API.DTOs.Grade;

namespace SM.API.Controllers.v1;

public class GradesController : BaseController
{
    private readonly IGradeService _gradeService;
    private readonly IEnrollmentService _enrollmentService;
    private readonly IMapper _mapper;

    public GradesController(IGradeService gradeService, IEnrollmentService enrollmentService, IMapper mapper)
    {
        _gradeService = gradeService;
        _enrollmentService = enrollmentService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var grades = await _gradeService.GetAsync();
        var courseDtos = _mapper.Map<IEnumerable<Grade>, IEnumerable<GradeDto>>(grades);

        return Ok(courseDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var grade = await _gradeService.GetByIdAsync(id);

        if (grade == null) {
            return BadRequest(new { message = "Grade not found" });
        }

        var gradeDto = _mapper.Map<GradeDto>(grade);

        return Ok(gradeDto);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateGradeRequest request)
    {
        var course = await _enrollmentService.GetByCourseIdAndStudentId(request.CourseId, request.StudentId);
        if (course != null)
        {
            return BadRequest(new { message = "It is not possible to assign marks to subject that student has not studied yet" });
        }
        
        var grade = new Grade(request.StudentId, request.CourseId, request.Score);
        var result = await _gradeService.CreateAsync(grade);
        var gradeDto = _mapper.Map<GradeDto>(grade);

        return Ok(gradeDto);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _gradeService.DeleteAsync(id);

        if (result == false)
            return BadRequest(new { message = "Grade not found" });

        return Ok(new DeleteGradeResponse());
    }
}