import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should display user info when userInfo is defined', () => {
    component.userInfo = { username: 'TestUser', role: 'Admin' };
    fixture.detectChanges();
    const userInfoElement = fixture.debugElement.query(By.css('.me-3'));
    expect(userInfoElement.nativeElement.textContent).toContain(
      'Bienvenido, TestUser (Admin)'
    );
  });

  it('should show logout button when user is logged in', () => {
    jest.spyOn(component, 'isLoggedIn').mockReturnValue(true);
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.query(By.css('button'));
    expect(logoutButton).toBeTruthy();
    expect(logoutButton.nativeElement.textContent).toBe('Cerrar Sesión');
  });

  it('should call logout method when logout button is clicked', () => {
    jest.spyOn(component, 'isLoggedIn').mockReturnValue(true);
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.query(By.css('button'));
    jest.spyOn(component, 'logout');
    logoutButton.triggerEventHandler('click', null);
    expect(component.logout).toHaveBeenCalled();
  });

  it('should contain router-outlet for routing', () => {
    const routerOutlet = fixture.debugElement.query(
      By.directive(RouterTestingModule)
    );
    expect(routerOutlet).toBeTruthy();
  });
});
