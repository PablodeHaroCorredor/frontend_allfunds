import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and return a token', () => {
    const mockResponse = { token: '12345' };
    const loginData = { username: 'testUser', password: 'password123' };

    service
      .login(loginData.username, loginData.password)
      .subscribe((response) => {
        expect(response.token).toBe('12345');
      });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);
    req.flush(mockResponse);
  });

  it('should log out and clear tokens', () => {
    jest.spyOn(service, 'clearToken');
    service.logout();
    expect(service.clearToken).toHaveBeenCalled();
  });

  it('should retrieve user information', () => {
    const mockUserInfo = { id: 1, username: 'testUser', role: 'admin' };

    jest.spyOn(service, 'getUserInfo').mockReturnValue(mockUserInfo);
    const userInfo = service.getUserInfo();
    expect(userInfo).toEqual(mockUserInfo);
  });
});
