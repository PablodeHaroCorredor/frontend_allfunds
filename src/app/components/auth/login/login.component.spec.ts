import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input values to username and password properties', () => {
    const usernameInput = fixture.debugElement.query(
      By.css('input[name="username"]')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('input[name="password"]')
    ).nativeElement;

    usernameInput.value = 'testUser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'testPassword';
    passwordInput.dispatchEvent(new Event('input'));

    expect(component.username).toBe('testUser');
    expect(component.password).toBe('testPassword');
  });

  it('should call login method on form submit', () => {
    jest.spyOn(component, 'login');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.login).toHaveBeenCalled();
  });

  it('should have a link to the registration page', () => {
    const registerLink = fixture.debugElement.query(
      By.css('a[routerLink="/register"]')
    ).nativeElement;
    expect(registerLink.textContent).toContain(
      '¿No tienes una cuenta? Regístrate'
    );
  });
});
