import _ from 'lodash';

export interface TodoItemType {
  id: number;
  checked: boolean;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Todo List
 */
export default class TodoManager {
  todos: TodoItemType[] = [];

  /**
   * 처음에 빈 배열이여야 하니까 초기화 비워둠
   * : 생성자는 선언해두는게 좋으니까(없으면 오류날수있음) 빈 상태로 놔두기
   */
  constructor() {}

  /**
   * item 체크 상태 변경 메서드
   */
  changeItemCheck(id: number) {
    this.todos.forEach((c) => {
      if (c.id === id) {
        c.checked = !c.checked;
      }
    });
  }

  /**
   * todos배열에 item 하나를 추가하는 메서드
   */
  addItem(title: string, description: string, startDate: Date, endDate: Date) {
    const item = {
      id: Date.now(),
      checked: false,
      title,
      description,
      startDate,
      endDate,
    };

    this.todos.push(item);
  }

  /**
   * todos list(배열)안에서 [x]버튼이 눌린 item을 삭제하는 메서드
   */
  removeItem(id: number) {
    // 왜 이렇게 따로 해줘야하는지?
    // (필터 돌린걸 변수로 빼서 그걸 다시 this.todos에 넣어줘야 삭제가 동작하는 이유?)
    // => 컴포넌트쪽 set이랑은 상관없이 Class 데이터 set을 따로 해줘야 해서
    // => 근데 왜 Class로 짰을때만...? => 아마도 옵저빙이 안되니까...?
    const item = this.todos.filter((item: TodoItemType) => item.id !== id);
    return (this.todos = item);
  }

  /**
   * 객체(item)들이 담긴 배열을 가져오는 메서드
   */
  getItems(): TodoItemType[] {
    return this.todos;
  }

  /**
   * todos list(배열)안에서 [수정]버튼이 눌린 item을 찾아 수정하는 메서드
   */
  setItem(
    id: number,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.todos.forEach((c) => {
      if (c.id === id) {
        c.id = id;
        c.title = title;
        c.description = description;
        c.startDate = startDate;
        c.endDate = endDate;
      }
    });
  }
}

export const toDoManager = new TodoManager();
