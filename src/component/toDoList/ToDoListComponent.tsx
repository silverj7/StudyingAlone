import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';

interface ToDoListType {
  id: String;
  toDoItem: string;
  checked: boolean;
}

const ToDoListComponent = (props: ToDoListType) => {
  const [textValue, setTextValue] = useState('');
  const [toDoList, setToDoList] = useState<ToDoListType[]>([]);

  const onChange = (list: string) => {
    if (list === '') {
      return;
    }
    setTextValue(list);
  };

  const onAdd = (e: any) => {
    const todo = {
      id: 'listCheck' + toDoList.length,
      toDoItem: textValue,
      checked: false,
    };

    setToDoList(toDoList.concat(todo));
    setTextValue('');
  };

  const onToggle = (e: any) => {
    setToDoList(
      toDoList.map((item) =>
        item.id === e.currentTarget.id
          ? {
              ...item,
              checked: e.currentTarget.checked,
            }
          : item,
      ),
    );
  };

  return (
    <ToDoListStyled>
      <div className="title">To Do List</div>
      <div className="input-box">
        <input
          type="text"
          value={textValue}
          onChange={(e: any) => onChange(e.target.value)}
          placeholder="To Do List를 입력해주세요"
        />
        <button className="input-btn" onClick={(e: any) => onAdd(e)}>
          +
        </button>
      </div>

      <div className="list-check-wrap">
        {toDoList.map((item, index) => (
          <div key={index} className="list-check">
            <input
              className="check_box"
              type="checkbox"
              id={`listCheck` + index}
              name={`listCheck` + index}
              checked={item.checked}
              onChange={(e: any) => {
                onToggle(e);
              }}
            />
            <label htmlFor={`listCheck` + index}>
              <div className="list-item-wrap">
                <em className="checkBox" />
                <div className="list-item">{item.toDoItem}</div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </ToDoListStyled>
  );
};

export default ToDoListComponent;

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

    .list-item {
      font-size: 16px;
      line-height: 16px;
      margin-left: 5px;
    }
  }
`;
