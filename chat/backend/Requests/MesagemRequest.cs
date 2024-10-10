namespace backend.Models;
public record AddMensagemRequest(Guid ConversaId, Guid UsuarioId, string Conteudo);
public record MensagemSaidaDTO(Guid Id, Guid ConversaId, Guid UsuarioId, string Conteudo, DateTime DataHora);