import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input values to username, password, and role properties', () => {
    const usernameInput = fixture.debugElement.query(
      By.css('input[name="username"]')
    ).nativeElement;
    const passwordInput = fixture.debugElement.query(
      By.css('input[name="password"]')
    ).nativeElement;
    const roleSelect = fixture.debugElement.query(
      By.css('select[name="role"]')
    ).nativeElement;

    usernameInput.value = 'testUser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'testPassword';
    passwordInput.dispatchEvent(new Event('input'));
    roleSelect.value = 'admin';
    roleSelect.dispatchEvent(new Event('change'));

    expect(component.username).toBe('testUser');
    expect(component.password).toBe('testPassword');
    expect(component.role).toBe('admin');
  });

  it('should call register method on form submit', () => {
    jest.spyOn(component, 'register');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.register).toHaveBeenCalled();
  });

  it('should have a link to the login page', () => {
    const loginLink = fixture.debugElement.query(
      By.css('a[routerLink="/login"]')
    ).nativeElement;
    expect(loginLink.textContent).toContain(
      '¿Ya tienes una cuenta? Inicia sesión'
    );
  });
});
