import { PdvPageComponent } from './components/pdv-page/pdv-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './components/shared/guard/auth.guard';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';
import { HomeComponent } from './components/layout/home/home.component';
import { LogoutComponent } from './components/login-page/logout.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'logout', component: LogoutComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
    ]
  },
  //{ path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
