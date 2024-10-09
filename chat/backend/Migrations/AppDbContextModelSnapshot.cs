﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("ConversaModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("IdUsuario1Id")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("IdUsuario2Id")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("IdUsuario1Id");

                    b.HasIndex("IdUsuario2Id");

                    b.ToTable("Conversas");
                });

            modelBuilder.Entity("MensagemModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Conteudo")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataHora")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("IdConversaId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("IdUsuarioId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("IdConversaId");

                    b.HasIndex("IdUsuarioId");

                    b.ToTable("Mensagens");
                });

            modelBuilder.Entity("backend.Models.UsuarioModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Senha")
                        .HasColumnType("TEXT");

                    b.Property<string>("Usuario")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("ConversaModel", b =>
                {
                    b.HasOne("backend.Models.UsuarioModel", "IdUsuario1")
                        .WithMany()
                        .HasForeignKey("IdUsuario1Id");

                    b.HasOne("backend.Models.UsuarioModel", "IdUsuario2")
                        .WithMany()
                        .HasForeignKey("IdUsuario2Id");

                    b.Navigation("IdUsuario1");

                    b.Navigation("IdUsuario2");
                });

            modelBuilder.Entity("MensagemModel", b =>
                {
                    b.HasOne("ConversaModel", "IdConversa")
                        .WithMany()
                        .HasForeignKey("IdConversaId");

                    b.HasOne("backend.Models.UsuarioModel", "IdUsuario")
                        .WithMany()
                        .HasForeignKey("IdUsuarioId");

                    b.Navigation("IdConversa");

                    b.Navigation("IdUsuario");
                });
#pragma warning restore 612, 618
        }
    }
}
