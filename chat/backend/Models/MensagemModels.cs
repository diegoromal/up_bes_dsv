public class MensagemModel
{
    public Guid Id { get; init; }
    public Guid IdConversa { get; private set; }
    public Guid IdUsuario { get; private set; }
    public string? Conteudo { get; private set; }
    public DateTime DataHora { get; private set; }
}
