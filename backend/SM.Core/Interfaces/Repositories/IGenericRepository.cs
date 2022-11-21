namespace SM.Core.Interfaces.Repositories;

public interface IGenericRepository<TEntity> where TEntity : class
{
    Task<TEntity> AddAsync(TEntity entity);

    Task<IEnumerable<TEntity>> GetAllAsync();

    Task<TEntity?> GetByIdAsync(int id);

    void Update(TEntity entityToUpdate);

    void Delete(TEntity entityToDelete);
}