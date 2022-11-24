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
    private readonly IEnrollmentService _enrollmentService;
    private readonly IMapper _mapper;
    private readonly IAWSS3Service _awsS3Service;

    public StudentsController(
        IStudentService studentService,
        IEnrollmentService enrollmentService,
        IMapper mapper,
        IAWSS3Service awsS3Service)
    {
        _studentService = studentService;
        _enrollmentService = enrollmentService;
        _mapper = mapper;
        _awsS3Service = awsS3Service;
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
            return BadRequest(new { message = "Student not found" });
        }

        return Ok(result);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromForm] CreateStudentRequest request)
    {
        string? avatar = null;

        if (request.Avatar != null)
        {
            await using var memoryStream = new MemoryStream();
            await request.Avatar.CopyToAsync(memoryStream);

            avatar = await _awsS3Service.UploadFileAsync(request.Avatar.ContentType, memoryStream, "avatar");
        }

        var student = new Student(
            request.FirstName,
            request.LastName,
            request.Email,
            request.DateOfBirth,
            request.Gender,
            avatar);

        var result = await _studentService.CreateAsync(student);

        return Ok(result);
    }

    [HttpPut]
    [Route("update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Update(int id, [FromForm] UpdateStudentRequest request)
    {
        var existingStudent = await _studentService.GetByIdAsync(id);

        if (existingStudent == null)
        {
            return BadRequest(new { message = "Student not found" });
        }

        string? avatar = null;

        if (request.Avatar != null)
        {
            if (existingStudent.Avatar != null)
            {
                await _awsS3Service.DeleteFileAsync(existingStudent.Avatar);
            }

            await using var memoryStream = new MemoryStream();
            await request.Avatar.CopyToAsync(memoryStream);

            avatar = await _awsS3Service.UploadFileAsync(request.Avatar.ContentType, memoryStream, "avatar");
        }

        var result = await _studentService.UpdateAsync(
            id,
            request.FirstName,
            request.LastName,
            avatar,
            request.Email,
            request.DateOfBirth,
            request.Gender);

        if (result == null)
            return BadRequest(new { message = "Student not found" });
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete(int id)
    {
        var existingStudent = await _studentService.GetByIdAsync(id);

        if (existingStudent == null)
        {
            return BadRequest(new { message = "Student not found" });
        }

        var enrollmentWithStudent = await _enrollmentService.IsAnyEnrollmentWithStudentAsync(id);

        if (enrollmentWithStudent)
        {
            return BadRequest(new { message = "Another enrollment already references this student" });
        }

        if (existingStudent.Avatar != null)
        {
            await _awsS3Service.DeleteFileAsync(existingStudent.Avatar);
        }

        await _studentService.DeleteAsync(id);

        return Ok(new DeleteStudentResponse());
    }
}