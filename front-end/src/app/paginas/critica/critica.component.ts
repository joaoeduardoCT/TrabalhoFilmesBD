import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CriticaService } from './critica.service';

@Component({
  selector: 'app-critica',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './critica.component.html',
  styleUrl: './critica.component.css',
})
export class CriticaComponent implements OnInit {
  filmes: any[] = [];
  filmesFiltrados: any[] = [];
  filtro: string = '';
  filmeSelecionado: any = null;

  nota: number = 0;
  comentario: string = '';

  constructor(private criticaService: CriticaService) {}

  ngOnInit(): void {
    this.criticaService.getFilmes().subscribe((data) => {
      this.filmes = data;
      this.filmesFiltrados = data;
    });
  }

  filtrarFilmes(): void {
    this.filmesFiltrados = this.filmes.filter((filme) =>
      filme.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  selecionarFilme(filme: any): void {
    this.filmeSelecionado = filme;
  }

  selecionarNota(valor: number) {
    this.nota = valor;
  }

  enviarAvaliacao(): void {
    const avaliacao = {
      id_usuario: 1,
      id_filme: this.filmeSelecionado.id,
      nota: this.nota,
      ds_comentario: this.comentario,
    };

    this.criticaService.enviarAvaliacao(avaliacao).subscribe({
      next: () => {
        alert('Avaliação enviada com sucesso!');
        this.resetarCampos();
      },
      error: () => alert('Erro ao enviar avaliação'),
    });
  }

  resetarCampos(): void {
    this.filmeSelecionado = null;
    this.nota = 0;
    this.comentario = '';
    this.filtro = '';
    this.filmesFiltrados = this.filmes;
  }
}
