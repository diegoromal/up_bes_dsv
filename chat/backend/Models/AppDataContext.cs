using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class AppDataContext : DbContext {
    public DbSet<UsuarioModel> Usuarios { get; set; } 

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlite("Data Source=Chat.db");
    }
}