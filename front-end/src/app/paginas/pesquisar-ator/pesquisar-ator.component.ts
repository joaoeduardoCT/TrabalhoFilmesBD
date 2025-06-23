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
    const filtroLower = this.filtro.toLowerCase();

    this.filmesFiltrados = this.filmes.filter((filme) => {
      try {
        const elenco = JSON.parse(filme.elenco);
        return elenco.some((ator: string) =>
          ator.toLowerCase().includes(filtroLower)
        );
      } catch (e) {
        console.error('Erro ao analisar elenco JSON:', e);
        return false;
      }
    });

    console.log('Filmes encontrados:', this.filmesFiltrados);
  }

  getElencoFormatado(elencoJson: string): string {
    try {
      const elenco = JSON.parse(elencoJson);
      return elenco.join(', ');
    } catch {
      return 'Elenco inválido';
    }
  }
}
