using Microsoft.AspNetCore.Mvc;
using SM.Core.Interfaces.Services;

namespace SM.API.Controllers.v1;

public class TestUploadController : BaseController
{
    private readonly IAWSS3Service _awsS3Service;
    public TestUploadController(IAWSS3Service aWSS3Service)
    {
        _awsS3Service = aWSS3Service;
    }

    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile file, string? prefix)
    {
        await using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        var result = await _awsS3Service.UploadFileAsync(file.ContentType, memoryStream, prefix);

        return Ok(result);
    }
}