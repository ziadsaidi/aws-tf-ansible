using AwsDotnetApp.Data;
using AwsDotnetApp.Models;
using MediatR;

namespace AwsDotnetApp.Features.Todos;

public record DeleteTodo(Guid Id) : IRequest<bool>;

public class DeleteTodoHandler(AppDbContext context) : IRequestHandler<DeleteTodo, bool>
{
    private readonly AppDbContext _context = context;

  public async Task<bool> Handle(DeleteTodo request, CancellationToken cancellationToken)
    {
        var todo = await _context.Todos.FindAsync([request.Id], cancellationToken);
        if (todo is null) return false;

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}
