import { Component, OnInit } from '@angular/core';
import { Artwork, ArtworksService } from 'src/app/services/artworks.service';

@Component({
  selector: 'app-my-artworks',
  templateUrl: './my-artworks.component.html',
  styleUrls: ['./my-artworks.component.scss'],
})
export class MyArtworksComponent implements OnInit {
  artworks: Artwork[] = [];
  constructor(private artworksService: ArtworksService) {}

  ngOnInit(): void {
    this.getUserArtworks();
  }

  async getUserArtworks() {
    await this.artworksService.getLoggedUserArtworks().then((result) => {
      this.artworks = result;
    });
  }
}
