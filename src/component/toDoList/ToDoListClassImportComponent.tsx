import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TodoManager, { TodoItemType } from '../../models/toDo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ToDoListClassImportComponent = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [toDoList, setToDoList] = useState<TodoItemType[]>([]);
  const [toDoManager, setToDoManager] = useState<TodoManager>(
    new TodoManager(),
  );

  useEffect(() => {
    setToDoList(toDoManager.getItems());
  }, []);

  // 날짜 출력 포맷 변경 함수
  const dateFormat = (date: any) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
  };

  // ADD 버튼 눌렀을때 작동하는 함수
  const onAdd = () => {
    // 입력한 제목이 없을때
    if (title === '') {
      alert('제목을 작성해주세요.');
      return;
    }

    // 입력한 내용이 없을때
    if (description === '') {
      alert('내용을 작성해주세요.');
      return;
    }

    // 선택한 날짜가 없을때
    if (!startDate || !endDate) {
      alert('날짜를 설정해주세요.');
      return;
    }

    toDoManager.addItem(title, description, startDate, endDate);

    const items = toDoManager.getItems();

    setToDoList([...items]);

    setTitle('');
    setDescription('');
  };

  // Modify 버튼 눌렀을때 작동하는 함수
  const onModify = (id: number) => {
    if (!startDate || !endDate) {
      alert('날짜를 설정해주세요.');
      return;
    }

    setTitle(title);
    setDescription(description);
    setStartDate(startDate);
    setEndDate(endDate);

    toDoManager.fetchItem(id, title, description, startDate, endDate);

    setIsEdit(false);
  };

  return (
    <ToDoListStyled isEdit={isEdit}>
      <div className="title">To Do List</div>
      <div className="input-box">
        <div className="input-item">
          <div className="input-item-title">제목 :</div>
          <input
            type="text"
            value={title}
            placeholder="To Do List 제목을 입력해주세요"
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="input-item">
          <div className="input-item-title">내용 :</div>
          <input
            type="text"
            value={description}
            placeholder="To Do List 내용을 입력해주세요"
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="input-item">
          <div className="input-item-title">시작 날 :</div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd(eee)"
            showTimeSelect={false}
            timeFormat="HH:mm"
            locale="ko"
            placeholderText="Weeks start on Monday"
          />
        </div>
        <div className="input-item">
          <div className="input-item-title">끝나는 날 :</div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy.MM.dd(eee)"
            showTimeSelect={false}
            timeFormat="HH:mm"
            locale="ko"
            placeholderText="Weeks start on Monday"
          />
        </div>
        <div className="btn-wrap">
          {isEdit && (
            <button
              className="modify-fin-btn"
              onClick={(e: any) => {
                e.preventDefault();
                onModify(id);
              }}
            >
              수정완료
            </button>
          )}

          <button
            className="add-btn"
            disabled={isEdit}
            onClick={(e: any) => {
              e.preventDefault();
              onAdd();
            }}
          >
            ADD
          </button>
        </div>
      </div>

      {/* TodolistItem */}
      <div className="list-check-wrap">
        {toDoList.map((item, index) => {
          return (
            <div key={item.id} className="list-check">
              <input
                className="check_box"
                type="checkbox"
                id={`listCheck` + index}
                name={`listCheck` + index}
                onChange={(e: any) => {
                  toDoManager.changeItemCheck(item.id);
                  setToDoList([...toDoManager.getItems()]);
                }}
              />
              <label htmlFor={`listCheck` + index}>
                <div className="list-item-wrap">
                  <div className="list-item-inner">
                    <em className="checkBox" />
                    <div
                      className="list-item-title"
                      style={{ fontWeight: '600', fontSize: '16px' }}
                    >
                      {item.title}
                    </div>
                    <div className="list-item-desc">({item.description})</div>
                    <div className="list-item-start">
                      {dateFormat(item.startDate)}
                    </div>
                    <div className="list-item-end">
                      {dateFormat(item.endDate)}
                    </div>
                  </div>

                  <div className="item-btn-wrap">
                    <div className="modify-btn">
                      <button
                        id={`listCheck` + index}
                        onClick={(e: any) => {
                          setIsEdit(true);
                          setId(item.id);
                          setTitle(item.title);
                          setDescription(item.description);
                          setStartDate(item.startDate);
                          setEndDate(item.endDate);
                        }}
                      >
                        수정
                      </button>
                    </div>
                    <div className="remove-btn">
                      <button
                        id={`listCheck` + index}
                        onClick={(e: any) => {
                          toDoManager.removeItem(item.id);
                          setToDoList([...toDoManager.getItems()]);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </ToDoListStyled>
  );
};

export default ToDoListClassImportComponent;

interface ToDoListStyledProps {
  isEdit: boolean;
}

export const ToDoListStyled = styled.div<ToDoListStyledProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 500px;
  margin: 200px auto;
  text-align: center;
  background: #c7bbff;
  border-radius: 20px;
  color: #fff;

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    color: #fff;
    overflow: visible;
    cursor: pointer;
  }

  .title {
    font-size: 30px;
    font-weight: 600;
    color: #000;
    margin-top: 25px;
  }

  .input-box {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    width: 100%;
    margin: 25px 0;
    padding: 0 20px;

    .input-item {
      display: flex;
      align-items: center;
    }

    .input-item-title {
      text-align: left;
      min-width: 100px;
    }

    input {
      width: 100%;
      max-width: 220px;
      min-width: 220px;
      padding: 10px;
      color: #000;
      border: solid 1px #fff;
      border-radius: 8px;
      background-color: #fff;

      ::placeholder {
        color: #000;
      }
    }

    .btn-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 15px;

      .modify-fin-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 68px;
        min-height: 40px;
        margin-right: 5px;
        padding: 5px;
        color: #fff;
        border: solid 1px #616bff;
        border-radius: 8px;
        background: #616bff;
      }

      .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 68px;
        min-height: 40px;
        padding: 10px;
        color: #fff;
        border-radius: 8px;
        border: ${({ isEdit }) => (isEdit ? '#8b8b8b' : 'solid 1px #616bff')};
        background: ${({ isEdit }) => (isEdit ? '#8b8b8b' : '#616bff')};
        cursor: ${({ isEdit }) => (isEdit ? 'unset' : 'pointer')};
      }
    }
  }

  .list-check-wrap {
    width: 100%;
    padding: 0 20px;

    .item-btn-wrap {
      display: flex;
      align-items: center;

      .modify-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 30px;
        max-height: 30px;
        font-size: 12px;
        line-height: 14px;
        padding: 4px 6px;
        margin: 2px;
        border: solid 1px #616bff;
        border-radius: 4px;
        background: #616bff;
      }

      .remove-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 30px;
        max-height: 30px;
        font-size: 12px;
        line-height: 14px;
        padding: 4px 6px;
        margin: 2px;
        border: solid 1px #616bff;
        border-radius: 4px;
        background: #616bff;
      }
    }
  }

  .list-check {
    width: 100%;
    float: none;
    padding: 0;
    text-align: center;
    color: #000;
    font-weight: 400;
    margin-bottom: 10px;

    :last-child {
      margin-bottom: 0;
    }

    .check_box {
      display: none;

      &[type='checkbox'] {
        & + label {
          box-sizing: border-box;
          cursor: pointer;
          font-size: 15px;
          letter-spacing: -0.1px;

          .checkBox {
            display: inline-block;
            width: 15px;
            min-width: 15px;
            height: 15px;
            background-color: #fff;
            border-radius: 2px;
            vertical-align: middle;
            position: relative;
            margin-right: 5px;
            padding: 4px;
            box-sizing: border-box;
          }
        }

        &:checked {
          & + label {
            & .checkBox {
              background: url(/images/ico_checkbox.svg) center 55% / 20px 14px
                no-repeat #f9a3a3;
            }
          }
        }
      }
    }
  }

  .list-item-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .list-item-inner {
      display: flex;
      align-items: center;
      column-gap: 10px;

      .list-item {
        font-size: 16px;
        line-height: 16px;
        margin-left: 5px;
      }
    }
  }
`;

// const StyledDatePicker = styled(DatePicker)`
//   width: 122px;
//   height: 48px;
//   border: none;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 100%;
//   padding: 20px;
//   background-color: transparent;
//   color: #707070;
//   position: absolute;
//   top: -48px;
//   left: 5px;
// `;
