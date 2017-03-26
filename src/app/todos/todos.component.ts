import { Component, OnInit, Injectable } from '@angular/core';
import { Todo } from '../todo'
import { TodoDataService } from '../todo-data.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoDataService]
})
@Injectable()
export class TodosComponent implements OnInit {

  title = 'app works!';
  newTodo: Todo = new Todo();
  todos:Todo[] = [];
  constructor(private todoDataService: TodoDataService){}

  addTodo(){
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo){
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo){
    this.todoDataService.deleteTodoById(todo.id);
  }

  ngOnInit() {
    this.todoDataService.getAllTodos().subscribe(todos => this.todos = todos );
  }

}
