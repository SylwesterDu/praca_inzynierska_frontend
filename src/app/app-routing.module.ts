import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkPageComponent } from './components/artwork-page/artwork-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MyAccountPageComponent } from './components/my-account-page/my-account-page.component';
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
  { path: 'my-account', component: MyAccountPageComponent },
  { path: 'artwork/:id', component: ArtworkPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
