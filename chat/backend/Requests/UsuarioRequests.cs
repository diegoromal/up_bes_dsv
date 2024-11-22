namespace backend.Models;
public record AddUsuarioRequest(string Nome, string Usuario, string Senha);
public record AttUsuarioRequest(string Nome, string Usuario, string Senha);

public record UsuarioSaidaDTO(Guid Id, string Nome, string Usuario);