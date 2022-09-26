import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isSearching: boolean = false;
  isLogged?: boolean;
  navigationSubscription;

  @ViewChild('mainPanel')
  mainPanel!: ElementRef<HTMLDivElement>;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.mainPanel.nativeElement &&
        !this.mainPanel.nativeElement.contains(<Node>e.target)
      ) {
        if (this.isSearching) {
          this.isSearching = false;
        }
      }
    });

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.isLogged = this.authService.isLogged();
      }
    });

    this.isLogged = this.authService.isLogged();
    console.log(this.isLogged);
  }

  ngOnInit(): void {}

  expand() {
    this.isSearching = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
