import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ToDoService } from '../services/todoservices.service';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl;
  constructor(private store: Store<AppState>, private service:ToDoService) {
    this.txtInput = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
  }

  addTodo() {
    if (this.txtInput.invalid) {
      return;
    }
    this.service.addTodo(this.txtInput.value).subscribe((response)=>{
      console.log('respuesta',response);
      this.store.dispatch(actions.create({ text: this.txtInput.value, id: response.id, completed: false}));
      this.txtInput.reset();
    });


  }
}
