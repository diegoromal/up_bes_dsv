using backend.Models;

public class ConversaModel
{
    public Guid Id { get; init; }
    public Guid Usuario1Id {get; init;}
    public Guid Usuario2Id {get; init;}
    public UsuarioModel Usuario1 { get; private set; } = null!;
    public UsuarioModel Usuario2 { get; private set; } = null!;
    public ICollection<MensagemModel> Mensagens { get; private set; } = new List<MensagemModel>();

    public ConversaModel (Guid usuario1Id, Guid usuario2Id)
    {
        Id = Guid.NewGuid();
        Usuario1Id = usuario1Id;
        Usuario2Id = usuario2Id;
    }
}