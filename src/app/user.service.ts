import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

export interface UserData {
  username: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'http://localhost:5090/api';

  constructor(private http: HttpClient) {}

  public async getUserData(): Promise<UserData> {
    return new Promise((resolve) => {
      this.http
        .get<UserData>(
          `${this.API_URL}/user`,

          {
            observe: 'response',
          }
        )
        .pipe(shareReplay())
        .subscribe({
          next: (result) => {
            resolve(result.body!);
          },
          error: (result: HttpErrorResponse) => {
            resolve({ id: '', username: '' });
          },
        });
    });
  }
}
