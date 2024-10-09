using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class MensagensRotas
{
    public static void AddRotasMensagens(this WebApplication app)
    {
        var rotasMensagens = app.MapGroup("mensagem");

        rotasMensagens.MapPost("", async (AddMensagemRequest request, AppDbContext db, CancellationToken ct) =>
        {
            var novaMensagem = new MensagemModel(request.ConversaId, request.UsuarioId, request.Conteudo);
            await db.Mensagens.AddAsync(novaMensagem, ct);
            await db.SaveChangesAsync(ct);

            var retornoMensagem = new MensagemSaidaDTO(novaMensagem.Id, novaMensagem.ConversaId, novaMensagem.UsuarioId, novaMensagem.Conteudo, novaMensagem.DataHora);
            
            return Results.Created("", retornoMensagem);

        });

        rotasMensagens.MapGet("conversa/{id:guid}", async (Guid id, AppDbContext db, CancellationToken ct) =>
        {
            var mensagens = await db.Mensagens
                .Where(mensagem => mensagem.ConversaId == id)
                .Select(mensagem => new MensagemSaidaDTO(
                    mensagem.Id, mensagem.ConversaId, mensagem.UsuarioId, mensagem.Conteudo, mensagem.DataHora))
                .ToListAsync(ct);

            return Results.Ok(mensagens);
        });    
    }
}