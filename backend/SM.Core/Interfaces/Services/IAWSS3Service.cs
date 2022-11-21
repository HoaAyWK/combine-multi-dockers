namespace SM.Core.Interfaces.Services;

public interface IAWSS3Service
{
    Task<string?> UploadFileAsync(string fileContentType, MemoryStream stream, string? prefix);

    Task<bool> DeleteFileAsync(string key);
}