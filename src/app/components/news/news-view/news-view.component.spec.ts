import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsViewComponent } from './news-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { signal, WritableSignal } from '@angular/core';

describe('NewsViewComponent', () => {
  let component: NewsViewComponent;
  let fixture: ComponentFixture<NewsViewComponent>;

  // Create a mock signal for the news list
  let mockNewsList: WritableSignal<
    {
      _id: string;
      title: string;
      description: string;
      author: string;
      date: Date;
    }[]
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsViewComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsViewComponent);
    component = fixture.componentInstance;

    // Initialize the mock signal with test data
    mockNewsList = signal([
      {
        _id: '1',
        title: 'News 1',
        description: 'Description 1',
        author: 'Author 1',
        date: new Date(),
      },
      {
        _id: '2',
        title: 'News 2',
        description: 'Description 2',
        author: 'Author 2',
        date: new Date(),
      },
    ]);

    // Assign the mock signal to the component's newsList
    component.newsList = () => mockNewsList();

    fixture.detectChanges();
  });

  it('should create the news view component', () => {
    expect(component).toBeTruthy();
  });

  it('should display news items', () => {
    const newsItems = fixture.debugElement.queryAll(By.css('.card'));
    expect(newsItems.length).toBe(2);
    expect(newsItems[0].nativeElement.textContent).toContain('News 1');
    expect(newsItems[1].nativeElement.textContent).toContain('News 2');
  });

  it('should call archive method with correct ID when archive button is clicked', () => {
    jest.spyOn(component, 'archive');
    const archiveButton = fixture.debugElement.queryAll(
      By.css('.btn-outline-primary')
    )[0];
    archiveButton.triggerEventHandler('click', null);

    expect(component.archive).toHaveBeenCalledWith('1');
  });

  it('should show "Crear Nueva Noticia" button if userRole is not "user"', () => {
    component.userRole = 'admin';
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(By.css('.btn-success'));
    expect(createButton).toBeTruthy();
  });

  it('should not show "Crear Nueva Noticia" button if userRole is "user"', () => {
    component.userRole = 'user';
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(By.css('.btn-success'));
    expect(createButton).toBeFalsy();
  });

  it('should have a button to view archived news', () => {
    const archivedButton = fixture.debugElement.query(
      By.css('button[routerLink="/archived"]')
    ).nativeElement;
    expect(archivedButton.textContent).toContain('Ver Noticias Archivadas');
  });

  it('should open the create news modal and call submitForm on form submit', () => {
    jest.spyOn(component, 'submitForm');
    component.openCreateModal();
    fixture.detectChanges();

    // Set form values
    component.newsForm.controls['title'].setValue('New Title');
    component.newsForm.controls['description'].setValue('New Description');
    component.newsForm.controls['content'].setValue('New Content');
    component.newsForm.controls['author'].setValue('New Author');

    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', null);

    expect(component.submitForm).toHaveBeenCalled();
  });
});
