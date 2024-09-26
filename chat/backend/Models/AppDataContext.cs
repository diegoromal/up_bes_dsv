using Microsoft.EntityFrameworkCore;

namespace backend.Models;

// Implementar a herança da classe DbContext
public class AppDataContext : DbContext {

    // Informar quais as classes que serão tabelas no banco de dados
    public DbSet<UserModel> Users { get; set; } 

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlite("Data Source=Chat.db");
    }
}