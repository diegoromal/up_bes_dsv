using backend.Models;

public class ConversaModel
{
    public Guid Id { get; init; }
    
    public virtual UsuarioModel? IdUsuario1 {get; private set;}
    public virtual UsuarioModel? IdUsuario2 {get; private set;}
}