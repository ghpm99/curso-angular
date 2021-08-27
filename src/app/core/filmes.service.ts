import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const url = "https://curso-angular-backend.herokuapp.com/api/v1/movie/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme) : Observable<Filme> {
    return this.http.post<Filme>(url,filme);
  }
}
