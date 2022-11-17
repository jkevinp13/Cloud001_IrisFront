import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  getAllToDoes() {
    const url = `${environment.API}/todoes`;
    return this.http.get(url);
  }
  addTodo(todo:string) {
    const url = `${environment.API}/todoes`;
    return this.http.post<{description: string; id:string}>(url, {active: true, description: todo});
  }
  deleteTodo(id:string) {
    const url = `${environment.API}/todoes/${id}`;
    return this.http.delete(url);
  }
  updateTodo(todo:ToDo) {
    const url = `${environment.API}/todoes/`;
    return this.http.put(url,todo);
  }

}
