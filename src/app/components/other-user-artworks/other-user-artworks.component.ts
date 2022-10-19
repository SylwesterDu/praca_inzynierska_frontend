import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artwork, ArtworksService } from 'src/app/services/artworks.service';

@Component({
  selector: 'app-other-user-artworks',
  templateUrl: './other-user-artworks.component.html',
  styleUrls: ['./other-user-artworks.component.scss'],
})
export class OtherUserArtworksComponent implements OnInit {
  artworks: Artwork[] = [];
  routeSubscription?: Subscription;

  @Input()
  currentArtworkId?: string = '';

  constructor(
    private artworksService: ArtworksService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((_) => {
      this.getUserArtworks();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  async getUserArtworks() {
    await this.artworksService.getLoggedUserArtworks().then((result) => {
      this.artworks = result.filter(
        (artwork) => artwork.id !== this.currentArtworkId
      );
    });
  }
}
