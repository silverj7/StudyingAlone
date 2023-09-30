import styled from '@emotion/styled';
import React, { Component } from 'react';

interface ToDoListType {
  id: string;
  toDoItem: string;
  checked: boolean;
}

class ToDoListClassComponent extends React.Component<any, any> {
  constructor(props: ToDoListType) {
    super(props);
    this.state = {
      text: '',
      toDoList: [],
    };
  }

  onChange = (e: any) => {
    if (e.target.value === '') {
      return;
    }

    this.setState({
      text: e.target.value,
    });
  };

  onAdd = () => {
    const todo = {
      id: 'listCheck' + this.state.toDoList.length,
      toDoItem: this.state.text,
    };

    this.setState({
      input: '',
      toDoList: this.state.toDoList.concat(todo),
    });
  };

  onToggle = (e: any) => {
    this.setState(
      this.state.toDoList.map((item: ToDoListType) =>
        item.id === e.currentTarget.id
          ? {
              ...item,
              checked: e.currentTarget.checked,
            }
          : item,
      ),
    );
  };

  onRemove = (e: any) => {
    this.setState({
      toDoList: this.state.toDoList.filter(
        (item: ToDoListType) => item.id !== e.target.id,
      ),
    });
  };

  render() {
    return (
      <ToDoListStyled>
        <div className="title">To Do List</div>
        <div className="input-box">
          <input
            type="text"
            name="toDoItem"
            value={this.state.toDoItem}
            onChange={(e: any) => this.onChange(e)}
            placeholder="To Do List를 입력해주세요"
          />
          <button className="input-btn" onClick={(e: any) => this.onAdd()}>
            +
          </button>
        </div>

        <div className="list-check-wrap">
          {this.state.toDoList.map((item: ToDoListType, index: number) => (
            <div key={index} className="list-check">
              <input
                className="check_box"
                type="checkbox"
                id={`listCheck` + index}
                name={`listCheck` + index}
                checked={item.checked}
                onChange={(e: any) => {
                  this.onToggle(e);
                }}
              />
              <label htmlFor={`listCheck` + index}>
                <div className="list-item-wrap">
                  <div className="list-item-inner">
                    <em className="checkBox" />
                    <div className="list-item">{item.toDoItem}</div>
                  </div>

                  <div className="remove-btn">
                    <button
                      id={`listCheck` + index}
                      onClick={(e: any) => {
                        this.onRemove(e);
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
  }
}

export default ToDoListClassComponent;

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
