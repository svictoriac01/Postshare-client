/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseTopHeadlines } from '../interfaces/noticias.interface';


const URL = environment.url;

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

    return this.http.get<ResponseTopHeadlines>(`${URL}/noticias?category=${categoria}&country=co&page=${this.categoriaPage}`);
  }

}
