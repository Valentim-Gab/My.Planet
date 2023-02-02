import { Injectable, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HeaderComponent } from "./components/header/header.component"
import { HomeComponent } from "./pages/home/home.component"
import { LoginComponent } from "./pages/login/login.component"
import { FormButtonComponent } from "./components/form-button/form-button.component"
import { RegistrationComponent } from "./pages/registration/registration.component"
import { FormMainComponent } from "./components/form-main/form-main.component"
import { UserProjectsComponent } from "./pages/user-projects/user-projects.component"
import { BannerProjectComponent } from "./components/banner-project/banner-project.component"
import { PopupProjectComponent } from "./components/popup-project/popup-project.component"
import { EditAccountComponent } from "./pages/edit-account/edit-account.component"
import { ProfileComponent } from "./pages/profile/profile.component"
import { PerfilProjectComponent } from "./components/perfil-project/perfil-project.component"
import { ThumbnailComponent } from "./components/thumbnail/thumbnail.component"
import { AlertComponent } from "./components/alert/alert.component"
import { MessagesComponent } from "./components/messages/messages.component"
import { UserCardComponent } from "./components/user-card/user-card.component"
import { SearchUserComponent } from "./pages/search-user/search-user.component"
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'
import { TokenInterceptor } from "./security/token-interceptor";
import { LoaderPlanetComponent } from './components/loader-planet/loader-planet.component';
import { SearchUserHeaderComponent } from './components/search-user-header/search-user-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    FormButtonComponent,
    RegistrationComponent,
    FormMainComponent,
    UserProjectsComponent,
    BannerProjectComponent,
    PopupProjectComponent,
    EditAccountComponent,
    ProfileComponent,
    PerfilProjectComponent,
    ThumbnailComponent,
    AlertComponent,
    MessagesComponent,
    UserCardComponent,
    SearchUserComponent,
    SearchBarComponent,
    NotFoundPageComponent,
    LoaderPlanetComponent,
    SearchUserHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}