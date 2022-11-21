using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using SM.API.DTOs.Student;
using SM.Core.Entities;

namespace SM.API.Controllers.v1;

public class StudentsController : BaseController
{
    private readonly IStudentService _studentService;
    private readonly IMapper _mapper;

    public StudentsController(IStudentService studentService, IMapper mapper)
    {
        _studentService = studentService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _studentService.GetAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _studentService.GetByIdAsync(id);

        if (result == null) {
            return BadRequest("Student not found");
        }

        return Ok(result);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateStudentRequest request)
    {
        var student = _mapper.Map<Student>(request);
        var result = await _studentService.CreateAsync(student);

        return Ok(result);
    }

    [HttpPut]
    [Route("update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateStudentRequest request)
    {
        var result = await _studentService.UpdateAsync(
            id,
            request.FirstName,
            request.LastName,
            request.Email,
            request.DateOfBirth,
            request.Gender);

        if (result == null)
            return BadRequest("Student not found");
        
        return Ok(result);
    }

    [HttpDelete]
    [Route("delete")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete(DeleteStudentRequest request)
    {
        var result = await _studentService.DeleteAsync(request.StudentId);

        if (result == false)
            return BadRequest("Student not found");

        return Ok(new DeleteStudentResponse());
    }
}