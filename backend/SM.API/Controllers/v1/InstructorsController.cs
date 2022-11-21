using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using SM.API.DTOs.Instructor;
using SM.Core.Entities;

namespace SM.API.Controllers.v1;

public class InstructorsController : BaseController
{
    private readonly IInstructorService _instructorService;
    private readonly IMapper _mapper;
    private readonly IAWSS3Service _awsS3Service;

    public InstructorsController(IInstructorService instructorService, IMapper mapper, IAWSS3Service awsS3Service)
    {
        _instructorService = instructorService;
        _mapper = mapper;
        _awsS3Service = awsS3Service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _instructorService.GetAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _instructorService.GetByIdAsync(id);

        if (result == null) {
            return BadRequest("Instructor not found");
        }

        return Ok(result);
    }

    [HttpPost]
    [Route("create")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Create([FromBody] CreateInstructorRequest request)
    {
        var result = await _instructorService.CreateAsync(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Phone,
            request.DateOfBirth);

        return Ok(result);
    }

    [HttpPut]
    [Route("update")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Update(int id, [FromForm] UpdateInstructorRequest request)
    {
        var existringInstructor = await _instructorService.GetByIdAsync(id);

        if (existringInstructor == null)
        {
            return BadRequest("Instructor not found");
        }

        string? avatar = null;

        if (request.Avatar != null)
        {
            if (existringInstructor.Avatar != null)
            {
                await _awsS3Service.DeleteFileAsync(existringInstructor.Avatar);
            }

            await using var memoryStream = new MemoryStream();

            await request.Avatar.CopyToAsync(memoryStream);
            avatar = await _awsS3Service.UploadFileAsync(
                request.Avatar.ContentType,
                memoryStream,
                "avatar");
        }

        var result = await _instructorService.UpdateAsync(
            id,
            request.FirstName,
            request.LastName,
            avatar,
            request.Email,
            request.Phone,
            request.DateOfBirth,
            request.Status);

        if (result == null)
            return BadRequest("Instructor not found");
        
        return Ok(result);
    }

    [HttpDelete]
    [Route("delete")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> Delete(DeleteInstructorRequest request)
    {
        var instructor = await _instructorService.GetByIdAsync(request.InstructorId);
        if (instructor == null)
            return BadRequest("Instructor not found");

        if (instructor.Avatar != null)
        {
            await _awsS3Service.DeleteFileAsync(instructor.Avatar);
        }

        var result = await _instructorService.DeleteAsync(request.InstructorId);

        return Ok(new DeleteInstructorResponse());
    }
}