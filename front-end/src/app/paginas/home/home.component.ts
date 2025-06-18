import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../navbar/navbar.component';
import { Filme, HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  filmes: Filme[] = [];
  isAdm: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getFilmes().subscribe({
      next: (dados) => (this.filmes = dados),
      error: (erro) => console.error('Erro ao buscar filmes', erro),
    });

    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.isAdm = user.isAdm === true;
  }
}
