using AwsDotnetApp.Data;
using AwsDotnetApp.Models;
using MediatR;
namespace AwsDotnetApp.Features.Todos;
public record GetTodo(Guid Id) : IRequest<Todo?>;

public class GetTodoHandler(AppDbContext context) : IRequestHandler<GetTodo, Todo?>
{
    private readonly AppDbContext _context = context;

  public Task<Todo?> Handle(GetTodo request, CancellationToken cancellationToken)
    {
        return _context.Todos.FindAsync([request.Id], cancellationToken).AsTask();
    }
}
