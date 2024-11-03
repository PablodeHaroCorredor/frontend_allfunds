import { TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch news list', () => {
    const mockNewsList = [
      { id: '1', title: 'News 1', description: 'Description 1' },
      { id: '2', title: 'News 2', description: 'Description 2' },
    ];

    service.getNews().subscribe((news) => {
      expect(news.length).toBe(2);
      expect(news).toEqual(mockNewsList);
    });

    const req = httpMock.expectOne('/api/news');
    expect(req.request.method).toBe('GET');
    req.flush(mockNewsList);
  });

  it('should create a news item', () => {
    const newNews = {
      title: 'New Title',
      description: 'New Description',
      content: 'Content',
      author: 'Author',
    };
    const mockResponse = { ...newNews, id: '3' };

    service.createNews(newNews).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/news');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newNews);
    req.flush(mockResponse);
  });

  it('should archive a news item by ID', () => {
    const newsId = '1';
    const mockResponse = { success: true };

    service.archiveNews(newsId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`/api/news/${newsId}/archive`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
