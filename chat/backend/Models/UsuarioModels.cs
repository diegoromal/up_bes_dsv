namespace backend.Models;

public class UsuarioModel
{
    public Guid Id { get; init; }
    public string Nome { get; private set; }
    public string Usuario { get; private set; }
    public string? Senha { get; private set; }
    public DateTime CriadoEm { get; init; }

    public ICollection<ConversaModel> Conversas1 { get; private set; } = new List<ConversaModel>();
    public ICollection<ConversaModel> Conversas2 { get; private set; } = new List<ConversaModel>();
    public ICollection<MensagemModel> Mensagens { get; private set; } = new List<MensagemModel>();

    public UsuarioModel(string nome, string usuario, string senha )
    {
        Nome = nome;
        Usuario = usuario;
        Senha  = senha; 
        Id = Guid.NewGuid();
        CriadoEm = DateTime.Now;
    }

    public void AtualizaUsuario(string nome, string usuario, string senha )
    {
        Nome = nome;
        Usuario = usuario;
        Senha  = senha;
    }
}