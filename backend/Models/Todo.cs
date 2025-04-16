namespace AwsDotnetApp.Models;

public record Todo(Guid Id, string Title, bool IsDone)
{
    public Todo UpdateTodo(string title, bool isDone)
    {
        return this with { Title = title, IsDone = isDone };
    }
}
