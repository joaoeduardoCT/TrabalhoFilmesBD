import { Component, OnInit } from '@angular/core';
import { Avaliacao, PerfilService } from './perfil.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];

  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    this.perfilService.getAvaliacoes().subscribe({
      next: (data) => {
        const usuarioId = 1;
        this.avaliacoes = data.filter(av => av.id_usuario === usuarioId);
      },
      error: (err) => console.error('Erro ao buscar avaliações:', err)
    });
  }

  deletar(id: number): void {
    this.perfilService.deleteAvaliacao(id).subscribe({
      next: () => {
        this.avaliacoes = this.avaliacoes.filter(a => a.id !== id);
      },
      error: (err) => console.error('Erro ao deletar avaliação:', err)
    });
  }

  editar(avaliacao: Avaliacao): void {
    const novaNota = prompt('Nova nota:', avaliacao.nota.toString());
    if (novaNota !== null) {
      this.perfilService.editarAvaliacao(avaliacao.id, parseFloat(novaNota), avaliacao.ds_comentario).subscribe({
        next: (data) => {
          const index = this.avaliacoes.findIndex(a => a.id === data.id);
          if (index !== -1) this.avaliacoes[index] = data;
        },
        error: (err) => console.error('Erro ao editar avaliação:', err)
      });
    }
  }
}

