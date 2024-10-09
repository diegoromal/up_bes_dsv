using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Usuario = table.Column<string>(type: "TEXT", nullable: false),
                    Senha = table.Column<string>(type: "TEXT", nullable: true),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Conversas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    IdUsuario1Id = table.Column<Guid>(type: "TEXT", nullable: true),
                    IdUsuario2Id = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conversas_Usuarios_IdUsuario1Id",
                        column: x => x.IdUsuario1Id,
                        principalTable: "Usuarios",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Conversas_Usuarios_IdUsuario2Id",
                        column: x => x.IdUsuario2Id,
                        principalTable: "Usuarios",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Mensagens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    IdConversaId = table.Column<Guid>(type: "TEXT", nullable: true),
                    IdUsuarioId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Conteudo = table.Column<string>(type: "TEXT", nullable: true),
                    DataHora = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mensagens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mensagens_Conversas_IdConversaId",
                        column: x => x.IdConversaId,
                        principalTable: "Conversas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Mensagens_Usuarios_IdUsuarioId",
                        column: x => x.IdUsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Conversas_IdUsuario1Id",
                table: "Conversas",
                column: "IdUsuario1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Conversas_IdUsuario2Id",
                table: "Conversas",
                column: "IdUsuario2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_IdConversaId",
                table: "Mensagens",
                column: "IdConversaId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_IdUsuarioId",
                table: "Mensagens",
                column: "IdUsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mensagens");

            migrationBuilder.DropTable(
                name: "Conversas");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
