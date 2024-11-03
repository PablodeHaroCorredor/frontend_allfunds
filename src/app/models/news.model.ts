// src/app/models/news.model.ts
export interface News {
  _id: string;
  title: string;
  description: string;
  date: string;
  content: string;
  author: string;
  archiveDate?: string; // Opcional si solo se aplica a noticias archivadas
}
