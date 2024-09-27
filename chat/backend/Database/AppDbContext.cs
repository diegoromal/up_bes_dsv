using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class AppDbContext : DbContext {
    private DbSet<UsuarioModel> Usuarios { get; set; } 

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlite("Data Source=Chat.db");
    }
}