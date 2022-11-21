using SM.Core.Entities;

namespace SM.Core.Interfaces.Repositories;

public interface ISemesterRepository : IGenericRepository<Semester>
{
    Task<Semester?> GetSemesterByNameAsync(string name);
}