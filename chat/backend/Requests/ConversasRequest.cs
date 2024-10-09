namespace backend.Models;
public record AddConversaRequest(Guid Usuario1Id, Guid Usuario2Id);
public record ConversaSaidaDTO(Guid Id, Guid Usuario1Id, Guid Usuario2Id);