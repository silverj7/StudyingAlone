interface ToDoListType {
  id: string;
  toDoItem: string;
  checked: boolean;
}

class Todo {
  id: string;
  toDoItem: string;
  checked: boolean;

  constructor(id: string, toDoItem: string, checked: boolean) {
    this.id = '';
    this.toDoItem = '';
    this.checked = false;
  }
}

class TodoManager {
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

  addItem(id: number, toDoItem: string) {
    const item = new Todo('listCheck' + id++, toDoItem, false);

    this.todos.push(item);
  }

  changeItemCheck(e: any) {
    return this.todos.map((item: ToDoListType) =>
      item.id === e.currentTarget.id
        ? {
            ...item,
            checked: e.currentTarget.checked,
          }
        : item,
    );
  }

  removeItem(e: any) {
    return this.todos.filter((item: ToDoListType) => item.id !== e.target.id);
  }
}

const toDoManager = new TodoManager();

// toDoManager.addItem(0, '', false);

export default Todo;
