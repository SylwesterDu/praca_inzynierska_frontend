import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

export interface UploadProcess {
  id: string;
  createdAt: Date;
  uploader: string;
}

export interface PublishArtworkRequest {
  title: string;
  artType: number;
  tags: string[];
  genres: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  API_URL: string = 'http://localhost:5090/api';

  constructor(private http: HttpClient) {}

  beginUploadProcess(): Promise<UploadProcess> {
    return new Promise((resolve, reject) => {
      this.http
        .get<UploadProcess>(`${this.API_URL}/upload`, { observe: 'response' })
        .pipe(shareReplay())
        .subscribe({
          next: (result) => {
            resolve(result.body!);
          },
          error: (result) => {
            reject(result);
          },
        });
    });
  }

  uploadFile(file: File, processId: string): Promise<boolean> {
    const formData: FormData = new FormData();
    formData.append('formFile', file);
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${this.API_URL}/upload/${processId}`, formData, {
          observe: 'response',
        })
        .pipe(shareReplay())
        .subscribe({
          next: (result) => resolve(true),
          error: (_) => reject(false),
        });
    });
  }

  publishArtwork(
    uploadProcessId: string,
    publishArtworkRequest: PublishArtworkRequest
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.API_URL}/upload/${uploadProcessId}/publish`,
          publishArtworkRequest,
          { observe: 'response' }
        )
        .pipe(shareReplay())
        .subscribe({
          next: (result) => resolve(true),
          error: (_) => reject(false),
        });
    });
  }
}
