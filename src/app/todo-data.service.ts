import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {

  lastId: number = 0;

  todos: Todo[] = [];

  constructor(private http: Http) { }

  addTodo(todo: Todo): TodoDataService{
    if(!todo.id){
      todo.id = ++this.lastId + "_tempID";
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id: String): TodoDataService{
    this.todos = this.todos.filter(todo => todo.id !== id );
    return this;
  }

  updateTodoById(id: String, values: Object={}): Todo{
    let todo = this.getTodoById(id);
    if(!todo){
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Observable<Todo[]> {
    return this.loadTask();
  }

  private loadTask(){
    return this.http.get('/api/tasks')
    .map(res => { return res.json().tasks; });
  } 

  getTodoById(id: String): Todo{
    return this.todos.filter(todo => todo.id === id).pop();
  }

  toggleTodoComplete(todo: Todo){
    let updateTodo = this.updateTodoById(todo.id, { complete: !todo.complete });
    return updateTodo;
  }

}
