import { createAction, props } from '@ngrx/store';
import { Todo } from './models/todo.model';

export const create = createAction(
  '[TODO] create ToDo',
  props<{ text: string, id: string, completed: boolean}>()
);

export const toggle = createAction(
  '[TODO] toggle ToDo',
  props<{ id: string }>()
)

export const deleteTodo = createAction(
  '[TODO] delete ToDo',
  props<{ id: string }>()
)

export const edit = createAction(
  '[TODO] edit ToDo',
  props<{ id: string, text: string }>()
)

export const toggleAll = createAction(
  '[TODO] toggleAll ToDo',
  props<{ completed: boolean }>()
)

export const clearCompleted = createAction(
  '[TODO] clearCompleted ToDo'
)

export const loadAllToDoes = createAction(
  '[TODO] loadAllToDoes',
  props<{ toDoes: Todo[] }>()
)
