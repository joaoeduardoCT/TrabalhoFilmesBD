import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddFilmeService {
  private url = 'http://localhost:3000/filmes';

  constructor(private http: HttpClient) {}

  adicionarFilme(filme: any): Observable<any> {
    return this.http.post(this.url, filme);
  }
}
