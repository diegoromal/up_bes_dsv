var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<UserController>();
var app = builder.Build();
// app.MapGet("/", () => "Hello World!");

app.MapUserRoutes();

app.Run();
