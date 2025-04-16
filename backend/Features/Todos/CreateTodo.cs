

using AwsDotnetApp.Data;
using AwsDotnetApp.Models;
using MediatR;

namespace AwsDotnetApp.Features.Todos;

public record CreateTodo(string Title): IRequest<Todo>;


public class CreateTodoHandler(AppDbContext context) : IRequestHandler<CreateTodo, Todo>
{
     private readonly AppDbContext _context = context;
  public async Task<Todo> Handle(CreateTodo request, CancellationToken cancellationToken)
  {
    var todo = new Todo
    {
      Title = request.Title
    };
    _context.Todos.Add(todo);
    await _context.SaveChangesAsync(cancellationToken);
    return todo;
    
  }
}
