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
  /**
   * 생성자 없으면 오류 날 수 있으니 빈 값으로라도 남겨두기
   * => 값이 없으면 빈값으로 표기하기 위해서 {}로 초기화
   */
  constructor() {}

  /**
   * 로컬스토리지 저장
   */
  private setList(todos: TodoItemType[]) {
    if (!window) return;

    localStorage.setItem(SAVE_TODOS, JSON.stringify(todos));
  }

  /**
   * 로컬스토리지에 저장된 todoList(todos) 가져오기
   * 초기화 용
   */
  public getListFromLocalStorage(): TodoItemType[] {
    const todosLocal = localStorage.getItem(SAVE_TODOS) ?? '';

    return JSON.parse(todosLocal) ?? [];
  }

  /**
   * todos list(배열) 가져오는 메서드
   */
  public getList(): TodoItemType[] {
    if (!window) return;

    const todosLocal = localStorage.getItem(SAVE_TODOS) ?? '';

    if (!todosLocal) return;

    return JSON.parse(todosLocal) ?? [];
  }

  /**
   * 객체에 담긴 item하나 가져오는 메서드
   * @param id
   * (해당 클래스 내에서만 제어하고싶으니까 private) : item 하나를 가져오는건 class 내부에서만 사용되면 되므로
   * 전달받은 id값으로 유저가 찾는 item을 필터해서 리턴해줌
   */
  private getItem(id: number): TodoItemType | null {
    const target = this.getList().filter((c) => c.id === id);
    return target[0] ?? null;
  }

  /**
   * todos배열에 item 하나를 추가하는 메서드
   * 날짜는 'changeDateToLocaleString'함수를 통해 locale format으로 변환해서 저장
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

    const todos = this.getList() ?? [];

    if (!window) return;

    todos.push(item);

    // 로컬스토리지에 저장
    this.setList(todos);
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
   * Locale(string)형식으로 출력
   * GMT -> UTC -> locale
   */
  public changeDateToLocaleString(date: Date): string {
    // 1. GMT로 생성된 날짜를 UTC(string)로 변환
    const UTCDate = new Date(date).toUTCString();

    // 2. 1에서 생성된 UTC(string)을 다시 UTC(Date)로 변환
    const UTCTemp = new Date(UTCDate);

    // 3. 2에서 생성된 UTC(Date)를 locale(string)으로 변환
    const LocaleDate = UTCTemp.toLocaleDateString();

    return LocaleDate;
  }

  /**
   * date Format Convert 메서드
   * locale -> UTC
   * locale date로 local에 저장하니까 '수정'버튼 눌렀을 때 안불러와짐
   * => date때문에 함수 두개나 나오는데 class에서 만드는게 효율적인건지에 대한 의문
   * => local에도 그냥 utc(Date형태)로 저장해두고 컴포넌트단에서 그냥 Format변경돌리기가 나을지?
   */
  public changeDateToUtcDate(date: string): Date {
    // 1. GMT로 생성된 날짜를 UTC(string)로 변환
    const UTCTemp = new Date(date).toUTCString();

    // 2. 1에서 생성된 UTC(string)을 다시 UTC(Date)로 변환
    const UTCDate = new Date(UTCTemp);

    return UTCDate;
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
    const todoList = this.getList();
    const target = this.getItem(id);
    const idx = todoList.findIndex((c) => c.id === id);

    if (!window && !target) return;

    target.title = title;
    target.description = description;
    target.convertStartDate = convertStartDate;
    target.convertEndDate = convertEndDate;

    todoList[idx] = target;

    this.setList(todoList);
  }

  /**
   * todos list(배열)안에서 [x]버튼이 눌린 item을 삭제하는 메서드
   * +) 로컬스토리지에서도 삭제
   * @param id
   * 전달받은 id값을 배열안에서 찾아서 해당 item만 "제외"하고 반환
   */
  public removeItem(id: number): TodoItemType[] {
    if (!window) return;

    const item = this.getList().filter((item: TodoItemType) => item.id !== id);

    // 로컬스토리지 전체 삭제 한 후에
    localStorage.removeItem(SAVE_TODOS);

    // 한개의 아이템이 삭제 된 리스트를 다시 로컬스토리지에 set
    this.setList(item);
  }

  /**
   * todos list(배열) 전체 삭제 메서드
   * +) todos 로컬스토리지 삭제
   */
  public removeAllItem() {
    if (!window) return;

    localStorage.removeItem(SAVE_TODOS);
  }
}

export const toDoManager = new TodoManager();
