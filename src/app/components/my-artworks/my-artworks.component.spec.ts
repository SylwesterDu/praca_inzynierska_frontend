import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArtworksComponent } from './my-artworks.component';

describe('MyArtworksComponent', () => {
  let component: MyArtworksComponent;
  let fixture: ComponentFixture<MyArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyArtworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
