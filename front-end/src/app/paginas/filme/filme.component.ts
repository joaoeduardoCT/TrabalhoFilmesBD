import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { NavbarComponent } from '../../navbar/navbar.component';
import { FilmeService } from './filme.service';

@Component({
  imports: [CommonModule, RouterModule, NavbarComponent],
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrl: './filme.component.css',
})
export class FilmeComponent implements OnInit {
  filme: any;
  isAdm = false;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmeService.getFilmePorId(id).subscribe((data) => {
      this.filme = data;
    });

    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.isAdm = user.isAdm === true;
  }

  excluirFilme(id: number) {
    this.filmeService.excluirFilme(id).subscribe({
      next: () => {
        alert(`Filme com ID ${id} excluído com sucesso`);
      },
      error: (err) => {
        alert('Erro ao excluir filme: ' + err.error.message);
      },
    });
  }
}
