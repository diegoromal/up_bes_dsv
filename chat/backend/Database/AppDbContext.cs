using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class AppDbContext : DbContext {
    public DbSet<UsuarioModel> Usuarios { get; set; } 
    public DbSet<ConversaModel> Conversas { get; set; } 
    public DbSet<MensagemModel> Mensagens { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuração do relacionamento entre ConversaModel e UsuarioModel
        modelBuilder.Entity<ConversaModel>()
            .HasOne(c => c.Usuario1)
            .WithMany(u => u.Conversas1)
            .HasForeignKey(c => c.Usuario1Id)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ConversaModel>()
            .HasOne(c => c.Usuario2)
            .WithMany(u => u.Conversas2)
            .HasForeignKey(c => c.Usuario2Id)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MensagemModel>()
            .HasOne(m => m.Conversa)
            .WithMany(c => c.Mensagens)
            .HasForeignKey(m => m.ConversaId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MensagemModel>()
            .HasOne(m => m.Usuario)
            .WithMany(u => u.Mensagens)
            .HasForeignKey(m => m.UsuarioId)
            .OnDelete(DeleteBehavior.Cascade);

        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlite("Data Source=Chat.db");
    }
}