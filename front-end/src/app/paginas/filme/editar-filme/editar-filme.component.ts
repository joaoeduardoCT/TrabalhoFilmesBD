import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FilmeService } from '../filme.service';

@Component({
  selector: 'app-editar-filme',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-filme.component.html',
  styleUrl: './editar-filme.component.css',
})
export class EditarFilmeComponent implements OnInit {
  filme: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmeService: FilmeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmeService.getFilmePorId(id).subscribe((data) => {
      this.filme = data;
    });
  }

  editarFilme() {
    this.filmeService.atualizarFilme(this.filme.id, this.filme).subscribe({
      next: () => {
        alert('Filme atualizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Erro ao atualizar: ' + err.error.message);
      },
    });
  }
}
