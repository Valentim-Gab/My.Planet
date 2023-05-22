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
import { UserPersonalWorksComponent } from "./pages/user-personal-works/user-personal-works.component"
import { BannerPersonalWorkComponent } from "./components/banner-personal-work/banner-personal-work.component"
import { PopupPersonalWorkComponent } from "./components/popup-personal-work/popup-personal-work.component"
import { EditAccountComponent } from "./pages/edit-account/edit-account.component"
import { ProfileComponent } from "./pages/profile/profile.component"
import { PerfilPersonalWorkComponent } from "./components/perfil-personal-work/perfil-personal-work.component"
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
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { CommentaryComponent } from './components/comments-section/commentary/commentary.component';
import { CategoryButtonComponent } from './components/category-button/category-button.component';
import { DropdownCategoriesComponent } from './components/popup-personal-work/dropdown-categories/dropdown-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    FormButtonComponent,
    RegistrationComponent,
    FormMainComponent,
    UserPersonalWorksComponent,
    BannerPersonalWorkComponent,
    PopupPersonalWorkComponent,
    EditAccountComponent,
    ProfileComponent,
    PerfilPersonalWorkComponent,
    ThumbnailComponent,
    AlertComponent,
    MessagesComponent,
    UserCardComponent,
    SearchUserComponent,
    SearchBarComponent,
    NotFoundPageComponent,
    LoaderPlanetComponent,
    SearchUserHeaderComponent,
    CommentsSectionComponent,
    CommentaryComponent,
    CategoryButtonComponent,
    DropdownCategoriesComponent
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