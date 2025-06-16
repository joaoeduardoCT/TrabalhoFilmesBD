import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private filmesUrl = 'http://localhost:3000/filmes';
  private avaliacoesUrl = 'http://localhost:3000/avaliacao';

  constructor(private http: HttpClient) {}

  getFilmes(): Observable<any[]> {
    return this.http.get<any[]>(this.filmesUrl);
  }

  getFilmePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.filmesUrl}/${id}`);
  }

  enviarAvaliacao(avaliacao: any): Observable<any> {
    return this.http.post(this.avaliacoesUrl, avaliacao);
  }

  excluirFilme(id: number) {
    return this.http.delete(`${this.filmesUrl}/${id}`);
  }

  atualizarFilme(id: number, filme: any) {
    return this.http.put(`${this.filmesUrl}/${id}`, filme);
  }
}
