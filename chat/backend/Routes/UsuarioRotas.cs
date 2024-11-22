using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class UsuarioRotas
{
    public static void AddRotasUsuarios(this WebApplication app)
    {
        var rotasUsuario = app.MapGroup("usuario");

        rotasUsuario.MapPost("", async (AddUsuarioRequest request, AppDbContext db, CancellationToken ct) => 
        {
            var usuarioExiste = await db.Usuarios.AnyAsync(usuario => usuario.Usuario == request.Usuario, ct);

            if (usuarioExiste)
                return Results.Conflict("Usuário já existe");

            string senhaHash = BCrypt.Net.BCrypt.EnhancedHashPassword(request.Senha, 13);

            var novoUsuario = new UsuarioModel(request.Nome, request.Usuario, senhaHash);
            await db.Usuarios.AddAsync(novoUsuario, ct);
            await db.SaveChangesAsync(ct);

            var retornoUsuario = new UsuarioSaidaDTO(novoUsuario.Id, novoUsuario.Nome, novoUsuario.Usuario);

            return Results.Created($"/usuario/{novoUsuario.Id}", retornoUsuario);
        });

        rotasUsuario.MapGet("todos", async (AppDbContext db, CancellationToken ct) =>
        {
            var usuarios = await db.Usuarios.Select(usuario => new UsuarioSaidaDTO(usuario.Id, usuario.Nome, usuario.Usuario)).ToListAsync(ct);

            return Results.Ok(usuarios);

        });

        rotasUsuario.MapGet("{id:guid:}", async (Guid id, AppDbContext db, CancellationToken ct) =>
        {
            var usuario = await db.Usuarios.SingleOrDefaultAsync(usuario => usuario.Id == id, ct);

            if(usuario == null)
                return Results.NotFound();

            var retornoUsuario = new UsuarioSaidaDTO(usuario.Id, usuario.Nome, usuario.Usuario);

            return Results.Ok(retornoUsuario);

        });

        rotasUsuario.MapPut("{id:guid}", async (Guid id, AttUsuarioRequest request, AppDbContext db, CancellationToken ct) =>
        {
            var usuario = await db.Usuarios.SingleOrDefaultAsync(usuario => usuario.Id == id, ct);

            if (usuario == null)
                return Results.NotFound();

            var usuarioExiste = await db.Usuarios.AnyAsync(usuario => usuario.Usuario == request.Usuario && usuario.Id != id, ct);

            if (usuarioExiste)
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