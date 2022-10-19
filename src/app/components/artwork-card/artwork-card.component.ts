import { Component, Input, OnInit } from '@angular/core';
import { Artwork } from 'src/app/services/artworks.service';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss'],
})
export class ArtworkCardComponent implements OnInit {
  @Input()
  artworkData?: Artwork;

  constructor() {}

  ngOnInit(): void {}
}
