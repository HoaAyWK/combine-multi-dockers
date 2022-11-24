using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using SM.API.DTOs.Subject;
using AutoMapper;
using SM.Core.Entities;

namespace SM.API.Controllers.v1;

public class SubjectsController : BaseController
{
    private readonly ISubjectService _subjectService;
    private readonly ICourseService _courseService;
    private readonly IMapper _mapper;

    public SubjectsController(
        ISubjectService subjectService,
        ICourseService courseService,
        IMapper mapper)
    {
        _subjectService = subjectService;
        _courseService = courseService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _subjectService.GetAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _subjectService.GetByIdAsync(id);

        if (result == null)
        {
            return BadRequest(new { message = "Subject not found" });
        }

        return Ok(result);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateSubjectRequest request)
    {
        var subject = _mapper.Map<Subject>(request);

        var result = await _subjectService.CreateAsync(subject);

        if (result == null) {
            return BadRequest(new { message = $"Subject with name '{request.Name}' already exists" });
        }

        return Ok(result);
    }

    [HttpPut]
    [Route("update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSubjectRequest request)
    {
        var result = await _subjectService.UpdateAsync(id, request.Name, request.NumOfCredits);

        if (result == null)
            return BadRequest(new { message = "Subject not found" });
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete(int id)
    {   
        var courseWithSubject = await _courseService.IsAnyCourseWithSubjectAsync(id);

        if (courseWithSubject)
        {
            return BadRequest(new { message = "Another course already references this subject" });
        }
        
        var result = await _subjectService.DeleteAsync(id);

        if (result == false)
            return BadRequest(new { message = "Subject not found" });

        return Ok(new DeleteSubjectResponse());
    }
}