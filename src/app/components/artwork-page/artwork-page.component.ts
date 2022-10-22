import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ArtworkDetails,
  ArtworksService,
} from 'src/app/services/artworks.service';

@Component({
  selector: 'app-artwork-page',
  templateUrl: './artwork-page.component.html',
  styleUrls: ['./artwork-page.component.scss'],
})
export class ArtworkPageComponent implements OnInit, OnDestroy {
  artworkDetails?: ArtworkDetails;
  routeSubscription?: Subscription;
  id: string = '';
  upvotesRatio: number = 0;

  constructor(
    private artworksService: ArtworksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getArtworkDetails();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  async getArtworkDetails() {
    this.artworkDetails = await this.artworksService.getArtworkDetails(this.id);
    console.log(this.artworkDetails);
    this.upvotesRatio =
      this.artworkDetails!.upvotes /
        (this.artworkDetails!.upvotes + this.artworkDetails!.downvotes) ?? 0;
    this.upvotesRatio *= 100;
    this.upvotesRatio = Math.round(this.upvotesRatio);
  }

  isNaN(number: number): boolean {
    return isNaN(number);
  }

  async downVote() {
    let success: boolean = await this.artworksService.downVote(this.id);
    if (success) {
      this.getArtworkDetails();
    }
  }
  async upVote() {
    let success: boolean = await this.artworksService.upVote(this.id);
    if (success) {
      this.getArtworkDetails();
    }
  }
}
