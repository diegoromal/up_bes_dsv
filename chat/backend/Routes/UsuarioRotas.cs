using backend.Models;

public static class UsuarioRotas
{
    public static void AddRotasUsuarios(this WebApplication app)
    {
        app.MapGet("usuarios", () => new UsuarioModel("Diego", "diego", "1q2w3e4r"));
    }
}