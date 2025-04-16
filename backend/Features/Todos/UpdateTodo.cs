using AwsDotnetApp.Data;
using AwsDotnetApp.Models;
using MediatR;

namespace AwsDotnetApp.Features.Todos;

public record UpdateTodo(Guid Id, string Title, bool IsDone) : IRequest<Todo?>;

public class UpdateTodoHandler : IRequestHandler<UpdateTodo, Todo?>
{
    private readonly AppDbContext _context;
    public UpdateTodoHandler(AppDbContext context) => _context = context;

    public async Task<Todo?> Handle(UpdateTodo request, CancellationToken cancellationToken)
    {
        var todo = await _context.Todos.FindAsync([request.Id], cancellationToken);
        if (todo is null) return null;

        todo.Title = request.Title;

        await _context.SaveChangesAsync(cancellationToken);
        return todo;
    }
}
