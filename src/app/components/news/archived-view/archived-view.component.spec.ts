import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivedViewComponent } from './archived-view.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ArchivedViewComponent', () => {
  let component: ArchivedViewComponent;
  let fixture: ComponentFixture<ArchivedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivedViewComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedViewComponent);
    component = fixture.componentInstance;
    component.archivedNewsList = jest.fn(() => [
      {
        _id: '1',
        title: 'Archived News 1',
        description: 'Description 1',
        author: 'Author 1',
        archiveDate: new Date(),
      },
      {
        _id: '2',
        title: 'Archived News 2',
        description: 'Description 2',
        author: 'Author 2',
        archiveDate: new Date(),
      },
    ]);
    fixture.detectChanges();
  });

  it('should create the archived view component', () => {
    expect(component).toBeTruthy();
  });

  it('should display archived news items', () => {
    const newsItems = fixture.debugElement.queryAll(By.css('.card'));
    expect(newsItems.length).toBe(2);
    expect(newsItems[0].nativeElement.textContent).toContain('Archived News 1');
    expect(newsItems[1].nativeElement.textContent).toContain('Archived News 2');
  });

  it('should call remove method when delete button is clicked and userRole is not user', () => {
    component.userRole = 'admin';
    fixture.detectChanges();
    jest.spyOn(component, 'remove');

    const deleteButtons = fixture.debugElement.queryAll(
      By.css('.btn-outline-danger')
    );
    expect(deleteButtons.length).toBe(2);

    deleteButtons[0].triggerEventHandler('click', null);
    expect(component.remove).toHaveBeenCalledWith('1');
  });

  it('should not show delete button when userRole is user', () => {
    component.userRole = 'user';
    fixture.detectChanges();

    const deleteButtons = fixture.debugElement.queryAll(
      By.css('.btn-outline-danger')
    );
    expect(deleteButtons.length).toBe(0);
  });

  it('should have a link to the recent news view', () => {
    const newsLink = fixture.debugElement.query(
      By.css('a[routerLink="/news"]')
    ).nativeElement;
    expect(newsLink.textContent).toContain('Ver Noticias Recientes');
  });
});
