import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagem = '';

  constructor(private auth: LoginService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.senha).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.mensagem = 'Login bem-sucedido!';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.mensagem = 'Senha incorreta.';
        } else if (err.status === 404) {
          this.mensagem = 'Usuário não encontrado.';
        } else {
          this.mensagem = 'Erro ao tentar fazer login.';
        }
      },
    });
  }
}
