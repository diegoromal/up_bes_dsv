using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class UsuarioRotas
{
    public static void AddRotasUsuarios(this WebApplication app)
    {
        var rotasUsuario = app.MapGroup("usuario");

        rotasUsuario.MapPost("", async (AddUsuarioRequest request, AppDbContext db) => 
        {
            var usuarioExiste = await db.Usuarios.AnyAsync(usuario => usuario.Nome == request.Nome);

            if (usuarioExiste)
                return Results.Conflict("Usuário já existe");

            string senhaHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Senha, 13);

            var novoUsuario = new UsuarioModel(request.Nome, request.Usuario, senhaHash);
            await db.Usuarios.AddAsync(novoUsuario);
            await db.SaveChangesAsync();

            return Results.Created();
        });

        rotasUsuario.MapGet("todos", async (AppDbContext db) =>
        {
            var usuarios = await db.Usuarios.Select(usuario => new UsuarioSaidaDTO(usuario.Id, usuario.Nome, usuario.Usuario)).ToListAsync();

            return Results.Ok(usuarios);

        });

        rotasUsuario.MapPut("{id:guid}", async (Guid id, AttUsuarioRequest request, AppDbContext db) =>
        {
            var usuario = await db.Usuarios.SingleOrDefaultAsync(usuario => usuario.Id == id);

            if (usuario == null)
                return Results.NotFound();

            if (usuario.Usuario == request.Usuario)
                return Results.Conflict("Usuário já existe");

            string senhaHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Senha, 13);

            usuario.AtualizaUsuario(request.Nome, request.Usuario, senhaHash);

            await db.SaveChangesAsync();

            var retornoUsuario = new UsuarioSaidaDTO(usuario.Id, usuario.Nome, usuario.Usuario);

            return Results.Ok(retornoUsuario);
        });

        rotasUsuario.MapDelete("{id:guid}", async (Guid id, AppDbContext db) =>
        {
            var usuario = await db.Usuarios.SingleOrDefaultAsync(usuario => usuario.Id == id);

            if (usuario == null)
                return Results.NotFound();

            db.Usuarios.Remove(usuario);

            await db.SaveChangesAsync();

            return Results.Ok();
        }); 
    }
}