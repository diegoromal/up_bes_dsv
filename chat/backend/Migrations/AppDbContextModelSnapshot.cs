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

                    b.Property<Guid>("Usuario1Id")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("Usuario2Id")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Usuario1Id");

                    b.HasIndex("Usuario2Id");

                    b.ToTable("Conversas");
                });

            modelBuilder.Entity("MensagemModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Conteudo")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ConversaId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataHora")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UsuarioId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ConversaId");

                    b.HasIndex("UsuarioId");

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
                    b.HasOne("backend.Models.UsuarioModel", "Usuario1")
                        .WithMany("Conversas1")
                        .HasForeignKey("Usuario1Id")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("backend.Models.UsuarioModel", "Usuario2")
                        .WithMany("Conversas2")
                        .HasForeignKey("Usuario2Id")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Usuario1");

                    b.Navigation("Usuario2");
                });

            modelBuilder.Entity("MensagemModel", b =>
                {
                    b.HasOne("ConversaModel", "Conversa")
                        .WithMany("Mensagens")
                        .HasForeignKey("ConversaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.UsuarioModel", "Usuario")
                        .WithMany("Mensagens")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Conversa");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("ConversaModel", b =>
                {
                    b.Navigation("Mensagens");
                });

            modelBuilder.Entity("backend.Models.UsuarioModel", b =>
                {
                    b.Navigation("Conversas1");

                    b.Navigation("Conversas2");

                    b.Navigation("Mensagens");
                });
#pragma warning restore 612, 618
        }
    }
}
