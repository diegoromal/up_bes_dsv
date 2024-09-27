namespace backend.Models;

public class UsuarioModel {
    public UsuarioModel() {
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }
    public string? Id {get; set;}
    public string? Nome {get; set;}
    public string? Usuario { get; set;}
    public string? Senha {get; set;}
    public DateTime CriadoEm { get; set; }
  
}
