interface ToDoListType {
  id: string;
  toDoItem: string;
  checked: boolean;
}

export class Todo {
  id: string;
  toDoItem: string;
  checked: boolean;

  public constructor(id: string, toDoItem: string) {
    this.id = id;
    this.toDoItem = toDoItem;
    this.checked = false;
  }

  changeItemCheck() {
    this.checked = !this.checked;
  }

  setItem(toDoItem: string) {
    this.toDoItem = toDoItem;
  }

  //   getItems() {
  //     return this.todos;
  //   }

  //   getItemsLength() {
  //     return this.todos.length;
  //   }

  //addItem(toDoItem: string) {
  //  const item = new Todo();
  //
  //  this.todos.push(item);
  //}

  //   removeItem(e: any) {
  //     return this.todos.filter((item: ToDoListType) => item.id !== e.target.id);
  //   }
}

// export const toDoManager = new Todo();

export default class TodoManager {
  todos: ToDoListType[] = [
    {
      id: '',
      toDoItem: '',
      checked: false,
    },
  ];

  getItems() {
    return this.todos;
  }

  getItemsLength() {
    return this.todos.length;
  }

  // changeItemCheck() {
  //  this.checked = !this.checked;
  // }

  // setItem(toDoItem: string) {
  //   this.todos.push(new Todo('listCheck' + this.getItemsLength(), toDoItem));
  // }

  addItem(toDoItem: string) {
    const item = new Todo('listCheck' + this.getItemsLength(), toDoItem);

    console.log(item, '<<<< Hi');
    this.todos.push(item);
  }

  removeItem(e: any) {
    return this.todos.filter((item: ToDoListType) => item.id !== e.target.id);
  }
}

export const toDoManager = new TodoManager();
