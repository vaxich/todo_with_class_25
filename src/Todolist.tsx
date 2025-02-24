

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FiltersType } from './App';
import './App.css';

export type TaskType = {
  id: string
  title: string
  isDone: boolean

}

type TodolistPropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filterValue: FiltersType
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, newFilterValue: FiltersType) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeTaskStatus: (todolistId: string, taskId: string) => void
  removeTodolist: (todolistId: string) => void
}

export const TodoList = (props: TodolistPropsType) => {

  const [inputValue, setInputValue] = useState("");
  const [inputError, setinputError] = useState(false);

  const { title, tasks, todolistId, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, filterValue } = props

  const onCkickRemoveTaskHandler = (taskId: string) => {
    removeTask(todolistId, taskId)
  }

  const onClickChangeFilter = (newFilterValue: FiltersType) => {
    changeFilter(todolistId, newFilterValue)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }




  const addTaskOnClick = () => {
    const trimmedTitle = inputValue.trim()
    if (trimmedTitle) {
      addTask(todolistId, trimmedTitle)
    } else {
      setinputError(true)
    }

    setInputValue("")
  }

  const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && addTaskOnClick()
  }

  const onChangeSetNewTitle = (el: ChangeEvent<HTMLInputElement>) => {
    inputError && setinputError(false)
    setInputValue(el.target.value)
  }


  const isAddBtnDisabled = !inputValue || inputValue.length > 15

  const messageForUser = inputError
    ? <span style={{ color: "red" }}>наименование не может быть пустым</span>
    : inputValue.length <= 15
      ? <span>введите новыю таску</span>
      : <span style={{ color: "red" }}>максимум 15 символов</span>

  return (
    <div className='todolist'>
      <h3>{title}</h3>
      <button onClick={removeTodolistHandler}>X</button>
      <div>

        <input
          value={inputValue}
          onChange={onChangeSetNewTitle}
          onKeyDown={onKeyDownAddTask}
          className={inputError ? "input_error" : ""}
        />
        <button
          disabled={isAddBtnDisabled}
          onClick={() => {
            addTaskOnClick()

          }}
        >+</button>
        <div>
          {messageForUser}
        </div>

      </div>
      <ul>
        {tasks.length === 0
          ? <span>you list is empty</span>
          : tasks.map(task => {
            return (
              <li key={task.id}>
                <input
                  type={"checkbox"}
                  checked={task.isDone}
                  onChange={() => { changeTaskStatus(todolistId, task.id) }}

                />
                <span className={task.isDone ? "task_done" : "task"} >{task.title}</span>
                <button onClick={() => onCkickRemoveTaskHandler(task.id)}>X</button>
              </li>
            )
          })
        }

      </ul>
      <div>
        <button
          onClick={() => onClickChangeFilter("All")}
          className={filterValue === 'All' ? "btn_active" : ""}
        >All</button>
        <button
          onClick={() => onClickChangeFilter("Active")}
          className={filterValue === 'Active' ? "btn_active" : ""}
        >Active</button>
        <button
          onClick={() => onClickChangeFilter("Completed")}
          className={filterValue === 'Completed' ? "btn_active" : ""}
        >Completed</button>
      </div>
    </div>
  )
}


