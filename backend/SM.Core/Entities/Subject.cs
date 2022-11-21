namespace SM.Core.Entities;

public class Subject : BaseEntity
{
    public string Name { get; private set; } = default!;

    public int NumOfCredits { get; private set; }

    public Subject(string name, int numOfCredits)
    {
        Name = name;
        NumOfCredits = numOfCredits;
    }

    public void Update(string name, int numbOfCredits)
    {
        Name = name;
        NumOfCredits = numbOfCredits;
    }
}