import _ from 'lodash';

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
  /**
   * private으로 선언해서 외부에서 item에 대한 직접적인 접근을 제어
   */
  private item: TodoItemType;

  // TODO :
  // 1. 수정하는 기능 만들기
  // 1-1. 1 추가하면서 리팩토링 (함수 여러개인거 하나로 해결할 수 있게 해보기)
  //

  /**
   * 객체 초기화
   */
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

  /**
   * item 체크 상태 변경 메서드
   */
  changeItemCheck() {
    this.item.checked = !this.item.checked;
  }

  /**
   * item을 (한꺼번에) 얻어 오는 메서드
   */
  getItem = (): TodoItemType => {
    return this.item;
  };

  /**
   * id 얻어 오는 메서드
   * id는 따로 얻을 일이 많아서 따로 추가 정의
   */
  getId = (): number => {
    return this.item.id;
  };
}

/**
 * Todo List 관리
 */
export default class TodoManager {
  /**
   * private으로 선언해서 외부에서 todos(todoListItem)에 대한 직접적인 접근을 제어
   */
  private todos: Todo[] = [];

  /**
   * 처음에 빈 배열이여야 하니까 초기화 비워둠
   * : 생성자는 선언해두는게 좋으니까(없으면 오류날수있음) 빈 상태로 놔두기
   */
  constructor() {}

  /**
   * 객체(item)들이 담긴 배열을 가져오는 메서드
   */
  getItems(): Todo[] {
    return this.todos;
  }

  /**
   * todos배열에 item 하나를 추가하는 메서드
   */
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

  /**
   * todos배열안에서 user가 클릭한 item이 어떤건지 찾아서 해당 item의 check상태를 바꿔주는 메서드
   */
  checkItem(id: number) {
    this.todos.forEach((c) => {
      if (c.getId() === id) {
        c.changeItemCheck();
      }
    });
  }

  /**
   * todos list(배열)안에서 [x]버튼이 눌린 item을 삭제하는 메서드
   */
  removeItem(id: number) {
    // 왜 이렇게 따로 해줘야하는지?
    // (필터 돌린걸 변수로 빼서 그걸 다시 this.todos에 넣어줘야 삭제가 동작하는 이유?)
    // => 컴포넌트쪽 set이랑은 상관없이 Class 데이터 set을 따로 해줘야 해서
    // => 근데 왜 Class로 짰을때만...? => 아마도 옵저빙이 안되니까...?
    const item = this.todos.filter((item: Todo) => item.getId() !== id);
    return (this.todos = item);
  }

  /**
   * todos list(배열)안에서 [수정]버튼이 눌린 item을 찾아 수정하는 메서드
   */
  setItem(
    id: number,
    checked: boolean,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.todos.forEach((c) => {
      if (c.getId() === id) {
        c.changeItemCheck();
      }
    });

    // const result: Todo[] = this.todos.map((item: Todo) => {
    //   return item.getId() === id
    //     ? {
    //         id: id,
    //         checked: checked,
    //         title: title,
    //         description: description,
    //         startDate: startDate,
    //         endDate: endDate,
    //         ...item,
    //       }
    //     : item;
    // });

    return (this.todos = result);
  }
}

export const toDoManager = new TodoManager();
