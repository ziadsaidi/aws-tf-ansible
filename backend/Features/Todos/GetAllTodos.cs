using AwsDotnetApp.Data;
using AwsDotnetApp.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AwsDotnetApp.Features.Todos;

public record GetAllTodos : IRequest<List<Todo>>;

public class GetAllTodosHandler : IRequestHandler<GetAllTodos, List<Todo>>
{
    private readonly AppDbContext _context;
    public GetAllTodosHandler(AppDbContext context) => _context = context;

    public async Task<List<Todo>> Handle(GetAllTodos request, CancellationToken cancellationToken)
    {
        return await _context.Todos.ToListAsync(cancellationToken);
    }
}
