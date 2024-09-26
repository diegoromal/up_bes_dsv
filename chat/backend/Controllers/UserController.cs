using backend.Models;

public class UserController {
    // Lista de usuario (exemplo)
    private readonly List<UserModel> _users;

    public UserController() {
        _users = new List<UserModel> {
            new UserModel{ Name = "Diego", Username = "diego", Password = "1q2w3e4r" },
            new UserModel{ Name = "Joao", Username = "joao", Password = "1q2w3e4r" },
        };
    }

    public IEnumerable<UserModel> GetAllUsers() {
        return _users;
    }

    public UserModel? GetUserById(string id) {
        return _users.FirstOrDefault(p => p.Id == id);
    }

    public UserModel? GetUserByUsername(string username) {
        return _users.FirstOrDefault(p => p.Username == username);
    }
}