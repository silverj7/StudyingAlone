interface TodoItemType {
  id: string;
  toDoItem: string;
  checked: boolean;
}

/**
 * Todo Item 값 관리
 */
export class Todo {
  private item: TodoItemType;

  public constructor(id: string, toDoItem: string, checked = false) {
    this.item = {
      id,
      toDoItem,
      checked,
    };
  }

  changeItemCheck() {
    this.item.checked = !this.item.checked;
  }

  getId = (): string => {
    return this.item.id;
  };

  getTodoItem = (): string => {
    return this.item.toDoItem;
  };
}

/**
 * Todo List 관리
 */
export default class TodoManager {
  private todos: Todo[] = [];

  constructor() {}

  getItems(): Todo[] {
    return this.todos;
  }

  addItem(toDoItem: string) {
    const item = new Todo('listCheck' + Date.now(), toDoItem);

    this.todos.push(item);
  }

  checkItem(id: string) {
    this.todos.forEach((c) => {
      if (c.getId() === id) {
        c.changeItemCheck();
      }
    });
  }

  removeItem(id: string) {
    return this.todos.filter((item: Todo) => item.getId() !== id);
  }
}

export const toDoManager = new TodoManager();
