import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';
import { Filme } from '../shared/models/filme';
import { ConfigParamsService } from './config-params.service';

const url = "https://curso-angular-backend.herokuapp.com/api/v1/movie/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
    private configService: ConfigParamsService) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  editar(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(url + filme.id, filme);
  }

  listarTodos(config: ConfigParams): Observable<Filme[]> {
    const httpParams = this.configService.configurarParametros(config);
    return this.http.get<Filme[]>(url, { params: httpParams });
  }

  visualizar(id: number): Observable<Filme> {
    return this.http.get<Filme>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
