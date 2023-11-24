import _ from 'lodash';
import { threadId } from 'worker_threads';

export interface TodoItemType {
  id: number;
  checked: boolean;
  title: string;
  description: string;
  convertStartDate: string;
  convertEndDate: string;
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
    this.todos = this.getListFromLocalStorage();
  }

  /**
   * 로컬스토리지 저장
   * (해당 클래스 내에서만 제어하고싶으니까 private)
   */
  private setList(todos: TodoItemType[]) {
    if (this.isWindowCheck()) {
      localStorage.setItem(SAVE_TODOS, JSON.stringify(todos));
    } else [];
  }

  /**
   * 로컬스토리지에 저장된 todoList(todos) 가져오기
   * 초기화 용
   */
  public getListFromLocalStorage() {
    if (this.isWindowCheck()) {
      const todos = JSON.parse(localStorage.getItem(SAVE_TODOS));

      if (todos.length === 0) {
        return [];
      } else return JSON.parse(localStorage.getItem(SAVE_TODOS));
    } else [];
  }

  /**
   * 윈도우 체크
   */
  public isWindowCheck() {
    return typeof window !== 'undefined';
  }

  /**
   * todos list(배열) 가져오는 메서드
   */
  public getList(): TodoItemType[] {
    return this.todos;
  }

  /**
   * 객체에 담긴 item하나 가져오는 메서드
   * @param id
   * (해당 클래스 내에서만 제어하고싶으니까 private) : item 하나를 가져오는건 class 내부에서만 사용되면 되므로
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
    const convertSDate = this.changeDateToLocaleString(startDate);
    const convertEDate = this.changeDateToLocaleString(endDate);

    const item: TodoItemType = {
      id: Date.now(),
      checked: false,
      title,
      description,
      convertStartDate: convertSDate,
      convertEndDate: convertEDate,
    };

    console.log(item, '<<<< item');

    console.log(this.todos, '<<<< this.todos');

    this.todos.push(item);

    this.setList(this.todos);
  }

  /**
   * item 체크 상태 변경 메서드
   * 현재 해당 메서드 가지고 추가적으로 하는 기능은 없음!
   */
  public changeItemCheck(id: number) {
    const target = this.getItem(id);

    if (!target) return;

    target.checked = !target.checked;
  }

  /**
   * date Format Convert 메서드
   * Mon Nov 13 2023 00:00:00 GMT+0900 (한국 표준시) <<<< 형식으로 넘어오는 날짜 데이터를
   * timestamp형식으로 바꾼 후에 Locale(string)형식으로 출력
   */
  public changeDateToLocaleString(date: Date): string {
    const timestamp = new Date(date);

    const LocaleDate = timestamp.toLocaleDateString();

    return LocaleDate;
  }

  /**
   * todos list(배열)안에서 [수정]버튼이 눌린 item을 찾아 수정하는 메서드
   */
  public fetchItem(
    id: number,
    title: string,
    description: string,
    convertStartDate: string,
    convertEndDate: string,
  ) {
    const target = this.getItem(id);
    if (!target) return;

    target.title = title;
    target.description = description;
    target.convertStartDate = convertStartDate;
    target.convertEndDate = convertEndDate;
  }

  /**
   * todos list(배열)안에서 [x]버튼이 눌린 item을 삭제하는 메서드
   * +) 로컬스토리지에서도 삭제
   * @param id
   * 전달받은 id값을 배열안에서 찾아서 해당 item만 "제외"하고 반환
   */
  public removeItem(id: number): TodoItemType[] {
    const item = this.todos.filter((item: TodoItemType) => item.id !== id);

    if (this.isWindowCheck()) {
      // 로컬스토리지 전체 삭제 한 후에
      localStorage.removeItem(SAVE_TODOS);

      // 한개의 아이템이 삭제 된 리스트를 다시 로컬스토리지에 set
      localStorage.setItem(SAVE_TODOS, JSON.stringify(item));

      // 삭제완료 된 list를 다시 todos에 set
      return (this.todos = item);
    } else this.todos = item;

    // _.remove(this.todos, (item: TodoItemType) => {
    //   return item.id === id;
    // });
  }

  /**
   * todos list(배열) 전체 삭제 메서드
   * +) todos 로컬스토리지 삭제
   */
  public removeAllItem(): [] {
    const clearList: [] = [];

    if (this.isWindowCheck()) {
      localStorage.removeItem(SAVE_TODOS);

      return (this.todos = clearList);
    }

    // else 일때 어떤걸 걸어줘야하는지 잘 모르겠음
    return (this.todos = clearList);
  }
}

export const toDoManager = new TodoManager();
