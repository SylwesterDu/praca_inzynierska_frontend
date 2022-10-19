import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserArtworksComponent } from './other-user-artworks.component';

describe('OtherUserArtworksComponent', () => {
  let component: OtherUserArtworksComponent;
  let fixture: ComponentFixture<OtherUserArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherUserArtworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
