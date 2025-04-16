using System.Reflection;
using AwsDotnetApp.Data;
using AwsDotnetApp.Features.Todos;
using AwsDotnetApp.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;



var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("TodosDb"));

// Add services to the container
builder.Services.AddMediatR(options => 
    options.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentPolicy",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("DevelopmentPolicy");
}

app.UseHttpsRedirection();

// Minimal API endpoints using MediatR
app.MapPost("/todos", async (CreateTodo cmd, IMediator mediator) =>
    Results.Ok(await mediator.Send(cmd)));

app.MapGet("/todos/{id}", async (Guid id, IMediator mediator) =>
    await mediator.Send(new GetTodo(id)) is Todo todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.MapGet("/todos", async (IMediator mediator) =>
    Results.Ok(await mediator.Send(new GetAllTodos())));

app.MapPut("/todos/{id}", async (Guid id, UpdateTodo update, IMediator mediator) =>
{
    if (id != update.Id) return Results.BadRequest("ID mismatch.");
    var result = await mediator.Send(update);
    return result is not null ? Results.Ok(result) : Results.NotFound();
});

app.MapDelete("/todos/{id}", async (Guid id, IMediator mediator) =>
    await mediator.Send(new DeleteTodo(id)) ? Results.Ok() : Results.NotFound());

app.Run("http://0.0.0.0:5000");
