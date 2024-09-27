var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<UsuarioController>();
var app = builder.Build();
// app.MapGet("/", () => "Hello World!");

app.MapearRotasDeUsuarios();

app.Run();
