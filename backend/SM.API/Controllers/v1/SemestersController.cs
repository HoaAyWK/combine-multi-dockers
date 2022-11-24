using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using SM.API.DTOs.Semester;
using AutoMapper;
using SM.Core.Entities;

namespace SM.API.Controllers.v1;

public class SemestersController : BaseController
{
    private readonly ISemesterService _semesterService;
    private readonly ICourseService _courseService;
    private readonly IMapper _mapper;

    public SemestersController(
        ISemesterService semesterService,
        ICourseService courseService,
        IMapper mapper)
    {
        _semesterService = semesterService;
        _courseService = courseService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _semesterService.GetAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _semesterService.GetByIdAsync(id);

        if (result == null) {
            return BadRequest(new { message = "Semester not found" });
        }

        return Ok(result);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateSemesterRequest request)
    {
        var sesmester = _mapper.Map<Semester>(request);
        var result = await _semesterService.CreateAsync(sesmester);

        if (result == null)
        {
            return BadRequest(new { message = $"Semester with name '{request.Name}' already exists" });
        }

        return Ok(result);
    }

    [HttpPut]
    [Route("update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSemesterRequest request)
    {
        var result = await _semesterService.UpdateAsync(id, request.Name);

        if (result == null)
            return BadRequest(new { message = "Semester not found" });
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete(int id)
    {
        var courseWithSemester = await _courseService.IsAnyCourseWithSemesterAsync(id);

        if (courseWithSemester)
        {
            return BadRequest(new { message = $"Another course already references this semster" });
        }

        var resutl = await _semesterService.DeleteAsync(id);

        if (resutl == false)
        {
            return BadRequest(new { message = "Semester not found" });
        }
        
        return Ok(new DeleteSemesterResponse());
    }
}