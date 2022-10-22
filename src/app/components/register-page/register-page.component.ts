import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterResult } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerResult: RegisterResult = { status: 200, error: '' };
  registerMessage: string = '';
  form = this.formBuilder.group({
    email: ['', Validators.compose([Validators.email, Validators.required])],
    username: [
      '',
      Validators.compose([Validators.minLength(4), Validators.required]),
    ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  hidePassword: boolean = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async register() {
    let result = await this.authService.register({
      email: this.form.value.email,
      username: this.form.value.username,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword,
    });

    this.registerResult = result;
    if (result.status === 200) {
      this.router.navigateByUrl('/login');
      return;
    }
    if (result.status === 409) {
      this.registerMessage = 'Nazwa użytkownika lub email są zajęte.';
      return;
    }
    if (result.status === 500) {
      this.registerMessage = 'Wymagane jest silniejsze hasło.';
    }
  }
}
