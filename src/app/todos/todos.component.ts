import { Component, Injectable, OnInit } from '@angular/core';
import { Todo } from '../todo'
import { TodoDataService } from '../todo-data.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoDataService]
})
@Injectable()
export class TodosComponent implements OnInit{

  title = 'app works!';
  newTodo: Todo = new Todo();
  //todos:Todo[] = [];
  constructor(private todoDataService: TodoDataService){}

  addTodo(){
    console.log("Test log", this.newTodo);
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo){
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo){
    this.todoDataService.deleteTodoById(todo.id);
  }

  ngOnInit(){
    console.log("init the service ");
    this.todoDataService.init();
  }


  get todos(){
    return this.todoDataService.getAllTodos();
  }

}
