import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
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
        localStorage.setItem('usuario', JSON.stringify(res.user));
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
