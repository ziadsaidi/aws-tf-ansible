

using AwsDotnetApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AwsDotnetApp.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

public DbSet<Todo> Todos => Set<Todo>();
}
