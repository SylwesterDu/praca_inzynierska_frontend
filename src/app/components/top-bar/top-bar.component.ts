import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isSearching: boolean = false;
  isLogged?: boolean;
  navigationSubscription;
  username: string = 'testowa nazwa';

  @ViewChild('mainPanel')
  mainPanel!: ElementRef<HTMLDivElement>;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
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
      if (e instanceof NavigationEnd) {
        this.isLogged = this.authService.isLogged();
      }
    });

    this.isLogged = this.authService.isLogged();
  }

  async ngOnInit(): Promise<void> {
    let userData = await this.userService.getUserData();
    // this.username = userData.username;
  }

  expand() {
    this.isSearching = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
