import { Component } from '@angular/core';
import { TodosComponent } from './todos/todos.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodosComponent]
})
export class AppComponent{
  

  /*get todos(){
    return this.todoDataService.getAllTodos();
  }*/

}
