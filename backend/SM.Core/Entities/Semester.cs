namespace SM.Core.Entities;

public class Semester : BaseEntity
{
    public string Name { get; set; } = default!;


    public Semester(string name)
    {
        Name = name;
    }

    public void Update(string name)
    {
        Name = name;
    }
}