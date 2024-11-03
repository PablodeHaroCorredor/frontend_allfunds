import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { News } from '../../../models/news.model';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class NewsViewComponent implements OnInit {
  newsList: WritableSignal<News[]> = signal([]); // Lista de noticias usando signals
  newsForm!: FormGroup;
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchInitialNews(); // Cargar noticias iniciales
    this.initializeForm(); // Inicializar el formulario
    this.userRole = this.authService.getUserRole();
  }

  // Cargar la lista inicial de noticias usando HTTP
  fetchInitialNews() {
    this.newsService
      .getNews()
      .subscribe((data: News[]) => this.newsList.set(data));
  }

  // Inicializar el formulario de noticias
  initializeForm() {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  // Crear una nueva noticia usando WebSocket
  submitForm() {
    if (this.newsForm.valid) {
      const newNews: News = this.newsForm.value;
      console.log(newNews);
      this.newsService.createNews(newNews); // Emitir evento de creación
      this.newsForm.reset(); // Resetear el formulario

      const modelDiv = document.getElementById('createModal');
      if (modelDiv != null) {
        modelDiv.style.display = 'none'; // Cerrar el modal
      }
    }
  }

  archive(id: string) {
    this.newsService.archiveNews(id).subscribe(() => this.fetchInitialNews());
  }

  // Mostrar el modal de creación
  openCreateModal() {
    const modalDiv = document.getElementById('createModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  // Cerrar el modal
  closeModal() {
    const modelDiv = document.getElementById('createModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
