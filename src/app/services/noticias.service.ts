/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseTopHeadlines } from '../interfaces/noticias.interface';



const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  getTopHeadLinesCategoria(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.http.get<ResponseTopHeadlines>(`${apiUrl}/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`, { headers });
  }

}
