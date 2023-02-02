import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegistrationComponent } from './pages/registration/registration.component'
import { EditAccountComponent } from './pages/edit-account/edit-account.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { UserProjectsComponent } from './pages/user-projects/user-projects.component'
import { SearchUserComponent } from './pages/search-user/search-user.component'
import { AuthGuard } from './security/guards/auth.guard'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component'
import { LoggedGuard } from './security/guards/logged.guard'
import { UserRouteGuard } from './security/guards/user-route.guard'
import { ExpiredGuard } from './security/guards/expired.guard'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  {
    path: 'cadastro',
    component: RegistrationComponent,
    canActivate: [LoggedGuard, ExpiredGuard],
  },
  {
    path: 'conta/:id',
    component: EditAccountComponent,
    canActivate: [UserRouteGuard, AuthGuard, ExpiredGuard],
  },
  {
    path: 'projetos/:id',
    component: UserProjectsComponent,
    canActivate: [UserRouteGuard, AuthGuard, ExpiredGuard],
  },
  {
    path: 'projetos/u/:id',
    component: UserProjectsComponent,
    canActivate: [UserRouteGuard, AuthGuard, ExpiredGuard],
  },
  {
    path: 'perfil/:id',
    component: ProfileComponent,
    canActivate: [UserRouteGuard, AuthGuard, ExpiredGuard],
  },
  {
    path: 'user/:id',
    component: ProfileComponent,
    canActivate: [ExpiredGuard],
  },
  {
    path: 'usuarios',
    component: SearchUserComponent,
    canActivate: [ExpiredGuard],
  },
  { path: '**', component: NotFoundPageComponent, canActivate: [ExpiredGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
