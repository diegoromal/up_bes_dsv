using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class UsuarioRotas
{
    public static void AddRotasUsuarios(this WebApplication app)
    {
        var rotasUsuario = app.MapGroup("usuario");

        rotasUsuario.MapPost("", async (AddUsuarioRequest request, AppDbContext db, CancellationToken ct) => 
        {
            var usuarioExiste = await db.Usuarios.AnyAsync(usuario => usuario.Nome == request.Nome, ct);

            if (usuarioExiste)
                return Results.Conflict("Usuário já existe");

            string senhaHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Senha, 13);

            var novoUsuario = new UsuarioModel(request.Nome, request.Usuario, senhaHash);
            await db.Usuarios.AddAsync(novoUsuario, ct);
            await db.SaveChangesAsync(ct);

            return Results.Created();
        });

        rotasUsuario.MapGet("todos", async (AppDbContext db, CancellationToken ct) =>
        {
            var usuarios = await db.Usuarios.Select(usuario => new UsuarioSaidaDTO(usuario.Id, usuario.Nome, usuario.Usuario)).ToListAsync(ct);

            return Results.Ok(usuarios);

        });

        rotasUsuario.MapPut("{id:guid}", async (Guid id, AttUsuarioRequest request, AppDbContext db, CancellationToken ct) =>
        {
            var usuario = await db.Usuarios.SingleOrDefaultAsync(usuario => usuario.Id == id, ct);

            if (usuario == null)
                return Results.NotFound();

            if (usuario.Usuario == request.Usuario)
                return Results.Conflict("Usuário já existe");

            string senhaHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Senha, 13);

            usuario.AtualizaUsuario(request.Nome, request.Usuario, senhaHash);

            await db.SaveChangesAsync(ct);

            var retornoUsuario = new UsuarioSaidaDTO(usuario.Id, usuario.Nome, usuario.Usuario);

            return Results.Ok(retornoUsuario);
        });

        rotasUsuario.MapDelete("{id:guid}", async (Guid id, AppDbContext db, CancellationToken ct) =>
        {
            var usuario = await db.Usuarios.SingleOrDefaultAsync(usuario => usuario.Id == id, ct);

            if (usuario == null)
                return Results.NotFound();

            db.Usuarios.Remove(usuario);

            await db.SaveChangesAsync(ct);

            return Results.Ok();
        }); 
    }
}