import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'upload', component: UploadPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
