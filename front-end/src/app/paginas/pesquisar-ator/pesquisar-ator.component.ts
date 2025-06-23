import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../navbar/navbar.component';
import { CriticaService } from '../critica/critica.service';

@Component({
  selector: 'app-pesquisar-ator',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './pesquisar-ator.component.html',
  styleUrl: './pesquisar-ator.component.css',
})
export class PesquisarAtorComponent implements OnInit {
  filmes: any[] = [];
  filmesFiltrados: any[] = [];
  filtro: string = '';

  constructor(private criticaService: CriticaService) {}

  ngOnInit(): void {
    this.criticaService.getFilmes().subscribe((data) => {
      console.log(data);
      this.filmes = data;
      this.filmesFiltrados = data;
    });
  }

  filtrarFilmes(): void {
    this.filmesFiltrados = this.filmes.filter((filme) => {
      const termo = this.filtro.toLowerCase();
      if (Array.isArray(filme.elenco)) {
        return filme.elenco.some((ator: string) =>
          ator.toLowerCase().includes(termo)
        );
      }
      try {
        const elenco = JSON.parse(filme.elenco);
        return (
          Array.isArray(elenco) &&
          elenco.some((ator: string) => ator.toLowerCase().includes(termo))
        );
      } catch (err) {
        console.error('Erro ao analisar elenco JSON:', err);
        return false;
      }
    });
  }

  getElencoFormatado(elenco: any): string {
    if (Array.isArray(elenco)) {
      return elenco.join(', ');
    }

    try {
      const parsed = JSON.parse(elenco);
      return Array.isArray(parsed) ? parsed.join(', ') : 'Elenco inválido';
    } catch {
      return 'Elenco inválido';
    }
  }
}
