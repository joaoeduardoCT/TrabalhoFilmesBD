import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Avaliacao {
  id: number;
  id_usuario: number;
  id_filme: number;
  nota: number;
  ds_comentario: string;
}

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private filmesUrl = 'http://localhost:3000/filmes';
  private avaliacoesUrl = 'http://localhost:3000/avaliacao';

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getFilmes(): Observable<any[]> {
    return this.http.get<any[]>(this.filmesUrl);
  }

  getFilmePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.filmesUrl}/${id}`);
  }

  enviarAvaliacao(avaliacao: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.avaliacoesUrl, avaliacao, { headers });
  }

  getAvaliacoes(): Observable<Avaliacao[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Avaliacao[]>(this.avaliacoesUrl, { headers });
  }

  deleteAvaliacao(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.avaliacoesUrl}/${id}`, { headers });
  }

  editarAvaliacao(id: number, novaNota: number, novoComentario: string): Observable<Avaliacao> {
    const headers = this.getAuthHeaders();
    return this.http.put<Avaliacao>(`${this.avaliacoesUrl}/${id}`, {
      nota: novaNota,
      ds_comentario: novoComentario
    }, { headers });
  }
}

