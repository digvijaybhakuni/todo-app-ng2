import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Todo } from './todo';

@Injectable()
export class TodoDataService{

  lastId: number = 0;

  todos: Todo[] = [];

  constructor(private http: Http) { }

  addTodo(todo: Todo): TodoDataService{
    if(!todo.id){
      let tempID = ++this.lastId + "_tempID"
      todo.owner = { id: "58d805a86e5bd0a630585349", name: "digvijay", time: new Date};
      this.http.post('api/tasks', todo)
        .map(res => res.json())
        .subscribe(task => this.updateTodoById(tempID, task));
      todo.id = tempID;
    }
    this.todos.push(todo);

    console.log("todos : ", this.todos);

    return this;
  }

  deleteTodoById(id: String): TodoDataService{
    console.log("todos : ", this.todos);
    this.todos = this.todos.filter(todo => todo.id !== id );
    return this;
  }

  updateTodoById(id: String, values: Object={}): Todo{
    let todo = this.getTodoById(id);
    if(!todo){
      return null;
    }
    Object.assign(todo, values);
    console.log("todos : ", this.todos);
    return todo;
  }

  getAllTodos():Todo[] {
    return this.todos;
  }

  init() {
    this.loadTask()
    //.subscribe(todos => this.todos = todos as Todo[]);
    .subscribe(todos => { this.todos = []; for(let t of todos){ this.todos.push(new Todo(t)); } });//Old and Not Kewl Way
  } 

  getTodoById(id: String): Todo{
    console.log("todos : ", this.todos);
    return this.todos.filter(todo => todo.id === id).pop();
  }

  toggleTodoComplete(todo: Todo){
    console.log("todos : ", this.todos);
    let updateTodo = this.updateTodoById(todo.id, { complete: !todo.complete });
    return updateTodo;
  }

  private loadTask(){
    return this.http.get('api/tasks')
    .map(res => res.json().tasks);
  }

}
