import { Component, OnInit } from '@angular/core';

enum View {
  Main,
  MyArtworks,
  Statistics,
  Settings,
}

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss'],
})
export class MyAccountPageComponent implements OnInit {
  currentView: View = View.MyArtworks;
  view = View;
  constructor() {}

  ngOnInit(): void {}

  setView(view: View) {
    this.currentView = view;
  }
}
