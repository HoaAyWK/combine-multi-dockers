using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using SM.API.DTOs.Course;
using AutoMapper;
using SM.Core.Entities;
using SM.AI.DTOs.Course;

namespace SM.API.Controllers.v1;

public class CoursesController : BaseController
{
    private readonly ICourseService _courseService;
    private readonly IMapper _mapper;

    public CoursesController(ICourseService courseService, IMapper mapper)
    {
        _courseService = courseService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var courses = await _courseService.GetAsync();
        var courseDtos = _mapper.Map<IEnumerable<Course>, IEnumerable<CourseDto>>(courses);

        return Ok(courseDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var course = await _courseService.GetByIdAsync(id);

        if (course == null) {
            return BadRequest("Course not found");
        }

        var courseDto = _mapper.Map<CourseDto>(course);

        return Ok(courseDto);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateCourseRequest request)
    {
        var course = _mapper.Map<Course>(request);
        var result = await _courseService.CreateAsync(course);
        var courseDto = _mapper.Map<CourseDto>(result);

        return Ok(courseDto);
    }

    [HttpPut]
    [Route("update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCourseRequest request)
    {
        var result = await _courseService.UpdateAsync(id, request.InstructorId, request.SubjectId, request.SemesterId);

        if (result == null)
            return BadRequest("Course not found");
        
        var courseDto = _mapper.Map<CourseDto>(result);
        
        return Ok(courseDto);
    }

    [HttpDelete]
    [Route("delete")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete([FromQuery] DeleteCourseRequest request)
    {
        var result = await _courseService.DeleteAsync(request.CourseId);

        if (result == false)
            return BadRequest("Course not found");

        return Ok(new DeleteCourseResponse());
    }
}