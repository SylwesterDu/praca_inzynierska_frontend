import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

export interface Artwork {
  id: string;
  title: string;
  upvotes: number;
  downvotes: number;
  views: number;
  artType: number;
  genres: string[];
  tags: string[];
}

export interface ArtworkDetails {
  id: string;
  resourceUrls: string[];
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  views: number;
  artType: number;
  genres: string[];
  tags: string[];
  owner: any;
}

export interface Comment {
  content: string;
  createdAt: Date;
  creatorName: string;
  creatorId: string;
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

  getArtworkDetails(id: string): Promise<ArtworkDetails> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ArtworkDetails>(`${this.API_URL}/artwork/${id}`, {
          observe: 'response',
        })
        .pipe(shareReplay())
        .subscribe({
          next: (result) => resolve(result.body!),
          error: (err) => reject(err),
        });
    });
  }

  getArtworkComments(id: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<Comment[]>(`${this.API_URL}/user/artworks/`, {
          observe: 'response',
        })
        .pipe(shareReplay())
        .subscribe({
          next: (result) => resolve(result.body!),
          error: (err) => reject(err),
        });
    });
  }

  upVote(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.API_URL}/artwork/${id}/upvote`, {
          observe: 'response',
        })
        .pipe(shareReplay())
        .subscribe({
          next: (result) => resolve(true),
          error: (err) => reject(false),
        });
    });
  }

  downVote(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.API_URL}/artwork/${id}/downvote`, {
          observe: 'response',
        })
        .pipe(shareReplay())
        .subscribe({
          next: (result) => resolve(true),
          error: (err) => reject(false),
        });
    });
  }
}
