using backend.Models;

public class UsuarioController {
    // Lista de usuario (exemplo)
    private readonly List<UsuarioModel> usuarios;

    public UsuarioController() {
        usuarios = new List<UsuarioModel> {
            new UsuarioModel{ Nome = "Diego", Usuario = "diego", Senha = "1q2w3e4r" },
            new UsuarioModel{ Nome = "Leopoldo", Usuario = "leopoldo", Senha = "1q2w3e4r" },
        };
    }

    public IEnumerable<UsuarioModel> RetornarTodos() {
        return usuarios;
    }

    public UsuarioModel? RetornarComID(string id) {
        return usuarios.FirstOrDefault(p => p.Id == id);
    }

    public UsuarioModel? RetornarComUsuario(string usuario) {
        return usuarios.FirstOrDefault(p => p.Usuario == usuario);
    }
}