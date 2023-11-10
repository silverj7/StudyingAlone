import _ from 'lodash';

export interface TodoItemType {
  id: number;
  checked: boolean;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

/*********************************************************************************************************************************
 * Todo List
 *********************************************************************************************************************************/
export default class TodoManager {
  todos: TodoItemType[] = [];

  /**
   * 처음에 빈 배열이여야 하니까 초기화 비워둠
   * : 생성자는 선언해두는게 좋으니까(없으면 오류날수있음) 빈 상태로 놔두기
   */

  ////////////////////////////////////////////////////////
  // TODO: 로컬스토리지나 쿠키 같은걸로 데이터 연결시키기!
  ////////////////////////////////////////////////////////
  constructor() {}

  /**
   * 객체(item)들이 담긴 배열을 가져오는 메서드
   */
  public getItems(): TodoItemType[] {
    return this.todos;
  }

  private getItem(id: number): TodoItemType | null {
    const target = this.todos.filter((c) => c.id === id);
    return target[0] ?? null;
  }

  /**
   * todos배열에 item 하나를 추가하는 메서드
   */
  public addItem(
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ) {
    const item: TodoItemType = {
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
   * item 체크 상태 변경 메서드
   */
  public changeItemCheck(id: number) {
    const target = this.getItem(id);
    if (!target) return;
    target.checked = !target.checked;
  }

  /**
   * todos list(배열)안에서 [수정]버튼이 눌린 item을 찾아 수정하는 메서드
   */
  public fetchItem(
    id: number,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ) {
    const target = this.getItem(id);
    if (!target) return;
    target.title = title;
    target.description = description;
    target.startDate = startDate;
    target.endDate = endDate;
  }

  /**
   * todos list(배열)안에서 [x]버튼이 눌린 item을 삭제하는 메서드
   */
  public removeItem(id: number) {
    // 왜 이렇게 따로 해줘야하는지?
    // (필터 돌린걸 변수로 빼서 그걸 다시 this.todos에 넣어줘야 삭제가 동작하는 이유?)
    // => 컴포넌트쪽 set이랑은 상관없이 Class 데이터 set을 따로 해줘야 해서
    // => 근데 왜 Class로 짰을때만...? => 아마도 옵저빙이 안되니까...?

    const item = this.todos.filter((item: TodoItemType) => item.id !== id);
    return (this.todos = item);
  }
}

export const toDoManager = new TodoManager();
