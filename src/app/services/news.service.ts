// src/app/services/news.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  // Obtener todas las noticias activas (carga inicial)
  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/active`);
  }

  // Obtener noticias archivadas
  getArchivedNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/archived`);
  }

  // Crear una nueva noticia
  createNews(newsData: Partial<News>): Observable<News> {
    return this.http.post<News>(`${this.apiUrl}`, newsData);
  }

  // Archivar una noticia existente
  archiveNews(id: string): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/${id}/archive`, {});
  }

  // Eliminar una noticia
  deleteNews(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una noticia existente
  updateNews(id: string, newsData: Partial<News>): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/${id}`, newsData);
  }
}
