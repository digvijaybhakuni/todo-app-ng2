import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { TodoDataService } from './todo-data.service';
import { AuthService, AuthGuard } from "./auth/AuthService"
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { httpFactory } from "./http/http.factory";
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsernameValidation } from './directive/username-validation';
import { EqualValueValidation } from './directive/equal-validation';

const APP_ROUTES = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'todos', pathMatch: 'full' }
];

const HTTP_PROVIDER = {
  provide: Http,
  useFactory: httpFactory,
  deps: [XHRBackend, RequestOptions]
};

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    NotificationComponent,
    UserProfileComponent,
    UsernameValidation,
    EqualValueValidation,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [TodoDataService, AuthService, AuthGuard, NotificationService, HTTP_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
