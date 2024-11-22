using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class AutenticacaoRotas
{
    public static void AddRotasAutenticacao(this WebApplication app)
    {
        var rotasAutenticacao = app.MapGroup("autenticacao");

        rotasAutenticacao.MapPost("login", async (LoginRequest request, AppDbContext db, CancellationToken ct) =>
        {
            var usuario = await db.Usuarios
                .Where(usuario => usuario.Usuario == request.Usuario)
                .FirstOrDefaultAsync(ct);

            if (usuario == null)
                return Results.Unauthorized();

            bool senhaValida = BCrypt.Net.BCrypt.EnhancedVerify(request.Senha, usuario.Senha);

            if (!senhaValida)
                return Results.Unauthorized();

            var retornoLogin = new LoginSaidaDTO(request.Usuario, true);
            
            return Results.Ok(retornoLogin);

        });
    }
}