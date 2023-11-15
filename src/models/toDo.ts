import _ from 'lodash';

export interface TodoItemType {
  id: number;
  checked: boolean;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export const SAVE_TODOS = 'todos';

/*******************************************************************************************************************************
 * Todo List
 *******************************************************************************************************************************/
export default class TodoManager {
  todos: TodoItemType[] = [];

  /**
   * 처음에 빈 배열이여야 하니까 초기화 비워둠
   * : 생성자는 선언해두는게 좋으니까(없으면 오류날수있음) 빈 상태로 놔두기
   */

  ////////////////////////////////////////////////////////
  // TODO: 로컬스토리지나 쿠키 같은걸로 데이터 연결시키기!
  ////////////////////////////////////////////////////////
  constructor() {
    // this.todos = this.getList();
  }

  /**
   * 로컬스토리지 저장
   */
  public setList() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SAVE_TODOS, JSON.stringify(this.todos));
    }
  }

  public getList() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(SAVE_TODOS));
    }
    return null;
  }

  /**
   * 로컬스토리지 가져오기
   * 성공했는데 지저분함 (원하는 방향성이 아니기도 함)
   */
  // public getList() {
  //   if (typeof window !== 'undefined') {
  //     const temp: TodoItemType[] = JSON.parse(localStorage.getItem(SAVE_TODOS));
  //     console.log(temp, '<<<< temp');

  //     const returnArr: TodoItemType[] = _.map(temp, (item) => {
  //       return item;
  //     });

  //     return returnArr;
  //   }
  //   return null;
  // }

  /**
   * todos list(배열) 가져오는 메서드
   */
  public getItems(): TodoItemType[] {
    return this.todos;
  }

  /**
   * 객체에 담긴 item하나 가져오는 메서드
   * @param id
   * 전달받은 id값으로 유저가 찾는 item을 필터해서 리턴해줌
   */
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

    this.setList();
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
   * @param id
   * 전달받은 id값을 배열안에서 찾아서 해당 item만 "제외"하고 반환
   */
  public removeItem(id: number) {
    // const item = this.todos.filter((item: TodoItemType) => item.id !== id);
    // return (this.todos = item);

    _.remove(this.todos, (item: TodoItemType) => {
      return item.id === id;
    });
  }
}

export const toDoManager = new TodoManager();
