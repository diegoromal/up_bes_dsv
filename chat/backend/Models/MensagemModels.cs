using backend.Models;

public class MensagemModel
{
    public Guid Id { get; init; }
    public virtual ConversaModel? IdConversa {get; private set;}
    public virtual UsuarioModel? IdUsuario {get; private set;}
    public string? Conteudo { get; private set; }
    public DateTime DataHora { get; private set; }
}
