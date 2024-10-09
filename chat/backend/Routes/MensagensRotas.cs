using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class MensagensRotas
{
    public static void AddRotasMensagens(this WebApplication app)
    {
        var rotasMensagens = app.MapGroup("mensagem");

        rotasMensagens.MapPost("", async (AddMensagemRequest request, AppDbContext db, CancellationToken ct) =>
        {
            var conversaExiste = await db.Mensagens.AnyAsync(conversa =>
                    (conversa.Usuario1Id == request.Usuario1Id && conversa.Usuario2Id == request.Usuario2Id) ||
                    (conversa.Usuario1Id == request.Usuario2Id && conversa.Usuario2Id == request.Usuario1Id), ct);
            
            if (conversaExiste)
                return Results.Conflict("Conversa já existe");

            var novaConversa = new ConversaModel(request.Usuario1Id, request.Usuario2Id);
            await db.Mensagens.AddAsync(novaConversa, ct);
            await db.SaveChangesAsync(ct);

            var retornoConversa = new MensagensaidaDTO(novaConversa.Id, novaConversa.Usuario1Id, novaConversa.Usuario2Id);
            
            return Results.Created($"/Mensagens/{novaConversa.Id}", retornoConversa);

        });

        rotasMensagens.MapGet("usuario/{id:guid}", async (Guid id, AppDbContext db, CancellationToken ct) =>
        {
            var Mensagens = await db.Mensagens
                .Where(conversa => conversa.Usuario1Id == id || conversa.Usuario2Id == id)
                .Select(conversa => new MensagensaidaDTO(
                    conversa.Id, id, conversa.Usuario1Id == id ? conversa.Usuario2Id : conversa.Usuario1Id))
                .ToListAsync(ct);

            return Results.Ok(Mensagens);
        });

        rotasMensagens.MapDelete("{id:guid}", async (Guid id, AppDbContext db, CancellationToken ct) =>
        {
            var conversa = await db.Mensagens.SingleOrDefaultAsync(conversa => conversa.Id == id, ct);

            if (conversa == null)
                return Results.NotFound();

            db.Mensagens.Remove(conversa);

            await db.SaveChangesAsync(ct);

            return Results.Ok();
        }); 
    
    }
}