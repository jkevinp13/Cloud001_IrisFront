import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { map, mergeMap } from 'rxjs/operators'

import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todoservices.service';
import { deleteTodo, edit, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  chkCompleted: FormControl;
  txtInput: FormControl;
  isEditing = false;
  @ViewChild('inputEdit') txtInputEdit: ElementRef;
  @Input() todo: Todo;
  constructor(private cdr: ChangeDetectorRef, private store: Store<AppState>, private service: ToDoService) { }


  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);
    this.chkCompleted.valueChanges.pipe(
      mergeMap((value)=>{
        console.log('v',value);
        return this.service.updateTodo({
          active: !value,
          description: this.txtInput.value,
          id: this.todo.id
        })
      })

    ).subscribe((res)=>{
      console.log(res)
      this.store.dispatch(toggle({ id: this.todo.id }));
    })
  }

  edit() {

    this.isEditing = true;
    this.txtInput.setValue(this.todo.text);
    this.cdr.detectChanges();
    this.txtInputEdit.nativeElement.select();
  }

  endEdit() {
    this.isEditing = false;
    if (this.txtInput.invalid || this.txtInput.value === this.todo.text) {
      return;
    }

    this.store.dispatch(edit({ id: this.todo.id, text: this.txtInput.value }))

  }

  delete() {
    this.service.deleteTodo(this.todo.id).subscribe(()=>{

      this.store.dispatch(deleteTodo({ id: this.todo.id }));
    })
  }

}
