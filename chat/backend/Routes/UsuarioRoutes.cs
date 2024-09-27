public static class UserRoute {
    public static void MapearRotasDeUsuarios(this IEndpointRouteBuilder rotas) {

        
        rotas.MapGet("/api/usuario/listar", (UsuarioController usuarios) => {
            var Users = usuarios.RetornarTodos();
            if (Users.Any()) {
                return Results.Ok(Users);
            }

            return Results.NotFound();
        });

        // routes.MapGet("/api/user/{id}", (UsuarioController usuarios, string id) => {
        //     var user = usuarios.RetornarComID(id);
        //     if (user != null) {
        //         return Results.Ok(user);
        //     }

        //     return Results.NotFound();
        // });

        // routes.MapGet("/api/username/{username}", (UsuarioController usuarios, string username) => {
        //     var user = usuarios.RetornarComUsuario(username);
        //     if (user != null) {
        //         return Results.Ok(user);
        //     }

        //     return Results.NotFound();
        // });
    }
}
