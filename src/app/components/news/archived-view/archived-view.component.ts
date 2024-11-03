import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../models/news.model'; // Importa el modelo
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-archived-view',
  templateUrl: './archived-view.component.html',
  imports: [CommonModule, RouterLink],
})
export class ArchivedViewComponent implements OnInit {
  archivedNewsList: WritableSignal<News[]> = signal([]); // Usa el tipo News[]
  userRole: string | null = null;

  constructor(
    private newsService: NewsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchArchivedNews();
    this.userRole = this.authService.getUserRole();
  }

  fetchArchivedNews() {
    this.newsService
      .getArchivedNews()
      .subscribe((data: News[]) => this.archivedNewsList.set(data)); // Usa el tipo News[]
  }

  remove(id: string) {
    this.newsService.deleteNews(id).subscribe(() => this.fetchArchivedNews());
  }
}
