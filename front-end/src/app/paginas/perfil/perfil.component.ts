import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NavbarComponent } from '../../navbar/navbar.component';
import { LoginService } from '../login/login.service';
import { Avaliacao, PerfilService } from './perfil.service';
import { Filme } from '../home/home.service';
import { FilmeService } from '../filme/filme.service';

@Component({
  imports: [CommonModule, NavbarComponent],
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];
  filmes: Filme[] = [];

  constructor(
    private perfilService: PerfilService,
    private loginService: LoginService,
    private filmeService: FilmeService
  ) {}

  ngOnInit() {
    this.perfilService.getAvaliacoes().subscribe({
      next: (data) => {
        const usuarioId = this.loginService.getUserId();
        this.avaliacoes = data.filter((av) => av.id_usuario === usuarioId);
      },
      error: (err) => console.error('Erro ao buscar avaliações:', err),
    });

    this.filmeService.getFilmes().subscribe({
      next: (data) => {
        this.filmes = data;
      },
      error: (err) => console.error('Erro ao buscar filmes:', err),
    });
  }

  getNomeFilme(id: number): string {
    const filme = this.filmes.find((f) => f.id === id);
    return filme ? filme.nome : 'Filme não encontrado';
  }

  deletar(id: number): void {
    this.perfilService.deleteAvaliacao(id).subscribe({
      next: () => {
        this.avaliacoes = this.avaliacoes.filter((a) => a.id !== id);
      },
      error: (err) => console.error('Erro ao deletar avaliação:', err),
    });
  }

  editar(avaliacao: Avaliacao): void {
    const novaNota = prompt('Nova nota:', avaliacao.nota.toString());
    if (novaNota === null) return;

    const novoComentario = prompt('Novo comentário:', avaliacao.ds_comentario);
    if (novoComentario === null) return;

    this.perfilService
      .editarAvaliacao(avaliacao.id, parseFloat(novaNota), novoComentario)
      .subscribe({
        next: (data) => {
          const index = this.avaliacoes.findIndex((a) => a.id === data.id);
          if (index !== -1) this.avaliacoes[index] = data;
        },
        error: (err) => console.error('Erro ao editar avaliação:', err),
      });
  }
}
