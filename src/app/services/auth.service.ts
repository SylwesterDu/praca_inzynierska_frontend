import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

interface LoginResponseBody {
  jwt: string;
}

export interface RegisterRequestBody {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponseBody {
  errorMessage: string;
}

export interface RegisterResult {
  status: number;
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  API_URL: string = 'http://localhost:5090/api';

  public async login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.http
        .post<LoginResponseBody>(
          `${this.API_URL}/auth/login`,
          {
            email: email,
            password: password,
          },
          { observe: 'response' }
        )
        .pipe(shareReplay())
        .subscribe({
          next: (result) => {
            this.saveToken(result);
            resolve(true);
          },
          error: (_) => {
            resolve(false);
          },
        });
    });
  }

  public async register(
    registerRequestBody: RegisterRequestBody
  ): Promise<RegisterResult> {
    return new Promise((resolve) => {
      this.http
        .post<RegisterResponseBody>(
          `${this.API_URL}/auth/register`,
          registerRequestBody,
          { observe: 'response' }
        )
        .pipe(shareReplay())
        .subscribe({
          next: (result) => {
            resolve({ status: result.status, error: '' });
          },
          error: (result: HttpErrorResponse) => {
            resolve({ status: result.status, error: result.error });
          },
        });
    });
  }

  private saveToken(response: HttpResponse<LoginResponseBody>) {
    let statuscode = response.status;
    let token = response.body?.jwt ?? '';
    localStorage.setItem('jwt', token);
  }

  public isLogged(): boolean {
    if (localStorage.getItem('jwt')) {
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem('jwt');
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('jwt');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
