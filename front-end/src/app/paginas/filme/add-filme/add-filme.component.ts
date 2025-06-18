import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../../navbar/navbar.component';
import { AddFilmeService } from './add-filme.service';

@Component({
  selector: 'app-add-filme',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './add-filme.component.html',
  styleUrl: './add-filme.component.css',
})
export class AddFilmeComponent {
  filme: any = {
    nome: '',
    distribuidora: '',
    diretor: '',
    genero: '',
    ano_lancamento: 2024,
  };

  elencoTexto: string = '["Ator 1", "Ator 2"]';
  mensagem: string = '';

  constructor(private addFilmeService: AddFilmeService) {}

  adicionarFilme() {
    try {
      const elenco = JSON.parse(this.elencoTexto);
      if (!Array.isArray(elenco)) {
        throw new Error('Elenco deve ser um array JSON.');
      }

      const dados = {
        ...this.filme,
        elenco: elenco,
      };

      this.addFilmeService.adicionarFilme(dados).subscribe({
        next: () => {
          this.mensagem = 'Filme adicionado com sucesso!';
        },
        error: (err) => {
          console.error(err);
          this.mensagem = 'Erro ao adicionar o filme.';
        },
      });
    } catch (e) {
      this.mensagem =
        'Elenco inválido. Use um array JSON, ex: ["Ator 1", "Ator 2"]';
    }
  }
}
