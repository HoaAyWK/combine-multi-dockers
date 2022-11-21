using SM.Core.Entities;

namespace SM.Core.Interfaces.Repositories;

public interface ISubjectRepository : IGenericRepository<Subject>
{
    Task<Subject?> GetSubjectByNameAsync(string name);
}