interface TodoItemType {
  id: number;
  checked: boolean;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Todo Item 값 관리
 */
export class Todo {
  private item: TodoItemType;

  public constructor(
    id: number,
    checked: boolean,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.item = {
      id,
      checked,
      title,
      description,
      startDate,
      endDate,
    };
  }
  // +) 제목, 설명, 기간

  changeItemCheck() {
    this.item.checked = !this.item.checked;
  }

  getId = (): number => {
    return this.item.id;
  };

  getTodoItemTitle = (): string => {
    return this.item.title;
  };

  getTodoItemDesc = (): string => {
    return this.item.description;
  };

  getTodoItemStartDate = (): Date => {
    return this.item.startDate;
  };

  getTodoItemEndtDate = (): Date => {
    return this.item.endDate;
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

  addItem(title: string, description: string, startDate: Date, endDate: Date) {
    const item = new Todo(
      Date.now(),
      false,
      title,
      description,
      startDate,
      endDate,
    );

    this.todos.push(item);
  }

  checkItem(id: number) {
    this.todos.forEach((c) => {
      if (c.getId() === id) {
        c.changeItemCheck();
      }
    });
  }

  removeItem(id: number) {
    // 왜 이렇게 따로 해줘야하는지?
    // (필터 돌린걸 변수로 빼서 그걸 다시 this.todos에 넣어줘야 삭제가 동작하는 이유?)
    // => 컴포넌트쪽 set이랑은 상관없이 Class 데이터 set을 따로 해줘야 해서
    // => 근데 왜 Class로 짰을때만...?
    const item = this.todos.filter((item: Todo) => item.getId() !== id);
    return (this.todos = item);
  }
}

export const toDoManager = new TodoManager();
