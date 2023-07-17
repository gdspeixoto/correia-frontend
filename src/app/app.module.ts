import { PdvPageComponent } from './components/pages/pdv-page/pdv-page.component';
import { SidebarNavComponent } from './components/shared/sidebar-nav/sidebar-nav.component';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import { httpInterceptorProviders } from './components/shared/guard';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { HomeComponent } from './components/layout/home/home.component';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProfileAccountComponent } from './components/pages/profile-account/profile-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    SidebarNavComponent,
    PdvPageComponent,
    HomeComponent,
    AuthenticationComponent,
    ProfileAccountComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatCheckboxModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'pt' },
    // *************************************************
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    // *************************************************
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
