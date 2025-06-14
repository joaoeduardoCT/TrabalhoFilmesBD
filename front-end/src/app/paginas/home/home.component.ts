import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Filme, HomeService } from './home.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  filmes: Filme[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getFilmes().subscribe({
      next: (dados) => (this.filmes = dados),
      error: (erro) => console.error('Erro ao buscar filmes', erro),
    });
  }
}
