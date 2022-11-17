
export class Todo {


  constructor(
    public text: string,
    public id: string,
    public completed: boolean) {
  }
}

export interface ToDo {
  active: boolean;
  description: string;
  id: string;
}
