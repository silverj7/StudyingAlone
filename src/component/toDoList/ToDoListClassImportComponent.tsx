import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TodoManager, { Todo } from 'models/toDo';

interface ToDoListType {
  id: string;
  toDoItem: string;
  checked: boolean;
}

const ToDoListClassImportComponent = () => {
  const [textValue, setTextValue] = useState('');
  const [toDoList, setToDoList] = useState<Todo[]>([]);
  const [toDoManager, setToDoManager] = useState<TodoManager>(
    new TodoManager(),
  );

  useEffect(() => {
    setToDoList(toDoManager.getItems());
  }, []);

  console.log('test2', toDoList);
  return (
    <ToDoListStyled>
      <div className="title">To Do List</div>
      <div className="input-box">
        <input
          type="text"
          placeholder="To Do List를 입력해주세요"
          onChange={(e: any) => {
            setTextValue(e.target.value);
          }}
        />
        <button
          className="input-btn"
          onClick={(e: any) => {
            e.preventDefault();
            toDoManager.addItem(textValue);

            const items = toDoManager.getItems();

            setToDoList([...items]);
          }}
        >
          +
        </button>
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
                  <div className="list-item">{item.getTodoItem()}</div>
                </div>

                <div className="remove-btn">
                  <button
                    id={`listCheck` + index}
                    onChange={(e: any) => {
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
  width: 400px;
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
    margin: 25px 0;

    input {
      padding: 10px;
      color: #000;
      border: solid 1px #fff;
      border-radius: 8px;
      background-color: #fff;

      ::placeholder {
        color: #000;
      }
    }

    .input-btn {
      min-width: 50px;
      margin-left: 5px;
      padding: 10px;
      color: #fff;
      border: solid 1px #616bff;
      border-radius: 8px;
      background: #616bff;
    }
  }

  .list-check-wrap {
    width: 100%;
    padding: 0 40px;

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

      .list-item {
        font-size: 16px;
        line-height: 16px;
        margin-left: 5px;
      }
    }
  }
`;
