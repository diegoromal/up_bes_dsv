using backend.Models;

public class MensagemModel
{
    public Guid Id { get; init; }
    public Guid ConversaId { get; init; }
    public Guid UsuarioId { get; init; }
    public string? Conteudo { get; private set; }
    public DateTime DataHora { get; private set; }

    public ConversaModel Conversa { get; private set; } = null!;
    public UsuarioModel Usuario { get; private set; } = null!;

}
