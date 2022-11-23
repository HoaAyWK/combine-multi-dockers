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
    private readonly IMapper _mapper;

    public GradesController(IGradeService gradeService, IMapper mapper)
    {
        _gradeService = gradeService;
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
            return BadRequest("Grade not found");
        }

        var gradeDto = _mapper.Map<GradeDto>(grade);

        return Ok(gradeDto);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateGradeRequest request)
    {
        var grade = _mapper.Map<Grade>(request);
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
            return BadRequest("Grade not found");

        return Ok(new DeleteGradeResponse());
    }
}