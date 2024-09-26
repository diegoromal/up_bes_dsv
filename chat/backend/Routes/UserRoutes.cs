public static class UserRoute {
    public static void MapUserRoutes(this IEndpointRouteBuilder routes) {

        
        routes.MapGet("/api/getAllUsers", (UserController controller) => {
            var Users = controller.GetAllUsers();
            if (Users.Any()) {
                return Results.Ok(Users);
            }

            return Results.NotFound();
        });

        routes.MapGet("/api/user/{id}", (UserController controller, string id) => {
            var user = controller.GetUserById(id);
            if (user != null) {
                return Results.Ok(user);
            }

            return Results.NotFound();
        });

        routes.MapGet("/api/username/{username}", (UserController controller, string username) => {
            var user = controller.GetUserByUsername(username);
            if (user != null) {
                return Results.Ok(user);
            }

            return Results.NotFound();
        });
    }
}
