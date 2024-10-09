using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class ConversasRotas
{
    public static void AddRotasConversas(this WebApplication app)
    {
        var rotasConversas = app.MapGroup("conversa");

        rotasConversas.MapPost("", async (AddConversaRequest request, AppDbContext db, CancellationToken ct) =>
        {
            var conversaExiste = await db.Conversas.AnyAsync(conversa =>
                    (conversa.Usuario1Id == request.Usuario1Id && conversa.Usuario2Id == request.Usuario2Id) ||
                    (conversa.Usuario1Id == request.Usuario2Id && conversa.Usuario2Id == request.Usuario1Id), ct);
            
            if (conversaExiste)
                return Results.Conflict("Conversa já existe");

            var novaConversa = new ConversaModel(request.Usuario1Id, request.Usuario2Id);
            await db.Conversas.AddAsync(novaConversa, ct);
            await db.SaveChangesAsync(ct);

            var retornoConversa = new ConversaSaidaDTO(novaConversa.Id, novaConversa.Usuario1Id, novaConversa.Usuario2Id);
            
            return Results.Created("", retornoConversa);

        });

        rotasConversas.MapGet("usuario/{id:guid}", async (Guid id, AppDbContext db, CancellationToken ct) =>
        {
            var conversas = await db.Conversas
                .Where(conversa => conversa.Usuario1Id == id || conversa.Usuario2Id == id)
                .Select(conversa => new ConversaSaidaDTO(
                    conversa.Id, id, conversa.Usuario1Id == id ? conversa.Usuario2Id : conversa.Usuario1Id))
                .ToListAsync(ct);

            return Results.Ok(conversas);
        });

        rotasConversas.MapDelete("{id:guid}", async (Guid id, AppDbContext db, CancellationToken ct) =>
        {
            var conversa = await db.Conversas.SingleOrDefaultAsync(conversa => conversa.Id == id, ct);

            if (conversa == null)
                return Results.NotFound();

            db.Conversas.Remove(conversa);

            await db.SaveChangesAsync(ct);

            return Results.Ok();
        }); 
    
    }
}