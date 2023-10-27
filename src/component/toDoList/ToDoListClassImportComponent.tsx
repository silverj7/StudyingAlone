import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TodoManager, { Todo } from '../../models/toDo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ToDoListClassImportComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [toDoList, setToDoList] = useState<Todo[]>([]);
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
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return (
      date.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second
    );
  };

  // ADD 버튼 눌렀을때 함수
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

  return (
    <ToDoListStyled>
      <div className="title">To Do List</div>
      <div className="input-box">
        <div className="input-item">
          <div>제목 :</div>
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
          <div>내용 :</div>
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
          <div>시작 날 :</div>
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
          <div>끝나는 날 :</div>
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
        <div className="add-btn-wrap">
          <button
            className="add-btn"
            onClick={(e: any) => {
              e.preventDefault();
              onAdd();
            }}
          >
            ADD
          </button>
        </div>
      </div>

      <div className="list-check-wrap">
        {toDoList.map((item, index) => (
          <div key={item.getId()} className="list-check">
            <input
              className="check_box"
              type="checkbox"
              id={`listCheck` + index}
              name={`listCheck` + index}
              onChange={(e: any) => {
                toDoManager.checkItem(item.getId());
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
                    {item.getTodoItemTitle()}
                  </div>
                  <div className="list-item-desc">
                    ({item.getTodoItemDesc()})
                  </div>
                  <div className="list-item-start">
                    {dateFormat(item.getTodoItemStartDate())}
                  </div>
                  <div className="list-item-end">
                    {dateFormat(item.getTodoItemEndtDate())}
                  </div>
                </div>

                <div className="remove-btn">
                  <button
                    id={`listCheck` + index}
                    onClick={(e: any) => {
                      toDoManager.removeItem(item.getId());
                      setToDoList([...toDoManager.getItems()]);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </ToDoListStyled>
  );
};

export default ToDoListClassImportComponent;

export const ToDoListStyled = styled.div`
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
      justify-content: space-between;
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

    .add-btn-wrap {
      text-align: right;
    }

    .add-btn {
      margin-top: 10px;
      min-width: 70px;
      max-width: 70px;
      padding: 10px;
      color: #fff;
      border: solid 1px #616bff;
      border-radius: 8px;
      background: #616bff;
    }
  }

  .list-check-wrap {
    width: 100%;
    padding: 0 20px;

    .remove-btn {
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
      padding: 2px 4px;
      margin: 2px;
      border: solid 1px #616bff;
      border-radius: 4px;
      background: #616bff;
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

const StyledDatePicker = styled(DatePicker)`
  width: 122px;
  height: 48px;
  border: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  padding: 20px;
  background-color: transparent;
  color: #707070;
  position: absolute;
  top: -48px;
  left: 5px;
`;
