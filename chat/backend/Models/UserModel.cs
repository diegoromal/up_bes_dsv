namespace backend.Models;

public class UserModel {
    public UserModel() {
        Id = Guid.NewGuid().ToString();
        CreatedAt = DateTime.Now;
    }
    public string? Id {get; set;}
    public string? Name {get; set;}
    public string? Username { get; set;}
    public string? Password {get; set;}
    public DateTime CreatedAt { get; set; }
  
}
