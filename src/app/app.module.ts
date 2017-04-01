import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TodoDataService } from './todo-data.service';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { UserComponent } from './user/user.component';

let APP_ROUTES = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserComponent},
  { path: 'todos', component: TodosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [TodoDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
