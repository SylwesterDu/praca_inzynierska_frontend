import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

export interface Artwork {
  id: string;
  title: string;
  upVotes: number;
  downVotes: number;
  views: number;
  artType: number;
  genres: string[];
  tags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  API_URL: string = 'http://localhost:5090/api';

  constructor(private http: HttpClient) {}

  getLoggedUserArtworks(): Promise<Artwork[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<Artwork[]>(`${this.API_URL}/user/artworks/`, {
          observe: 'response',
        })
        .pipe(shareReplay())
        .subscribe({
          next: (result) => resolve(result.body!),
          error: (_) => reject([]),
        });
    });
  }
}
