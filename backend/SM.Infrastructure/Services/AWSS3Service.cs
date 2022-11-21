using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using SM.Core;
using SM.Core.Interfaces.Services;

namespace SM.Infrastructure.Services;

public class AWSS3Service : IAWSS3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;
    public AWSS3Service(IOptionsMonitor<AWSConfig> options)
    {
        var credentials = new BasicAWSCredentials(
            options.CurrentValue.AWSAccessKey,
            options.CurrentValue.AWSSecretKey);
        _s3Client = new AmazonS3Client(credentials, RegionEndpoint.APSoutheast1);
        _bucketName = options.CurrentValue.BucketName;
    }

    public async Task<string?> UploadFileAsync(
        string fileContentType,
        MemoryStream stream,
        string? prefix)
    {
       try
       {
            var uId = Guid.NewGuid();
            var key = string.IsNullOrEmpty(prefix) ? $"{uId}" : $"{prefix?.TrimEnd('/')}/{uId}";
            var putRequest = new PutObjectRequest
            {
                BucketName = _bucketName,
                Key = key,
                InputStream = stream,
                CannedACL = S3CannedACL.PublicRead
            };

            putRequest.Metadata.Add("Content-Type", fileContentType);

            var uploadResult = await _s3Client.PutObjectAsync(putRequest);

            return key;
       }
       catch (Exception e)
       {
            Console.WriteLine(
                "Unknown encountered on server. Message:'{0}' when writing an object",
                e.Message);
            return null;
       }
    }

    public async Task<bool> DeleteFileAsync(string key)
    {
        try
        {
            var deleteObjectRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = key
            };

            await _s3Client.DeleteObjectAsync(deleteObjectRequest);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine("Unknown encountered on server. Message:'{0}' when deleting an object", e.Message);
            return false;
        }
    }
}