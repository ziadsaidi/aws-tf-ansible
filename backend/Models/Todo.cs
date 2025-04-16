namespace AwsDotnetApp.Models;

public class Todo
{

    public Guid Id { get; set; } = Guid.NewGuid();

    public string Title { get; set; }
    

    public bool IsDone { get; set; }
}

