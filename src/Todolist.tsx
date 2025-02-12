

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FiltersType } from './App';
import './App.css';

export type TaskType = {
  id: string
  isDone: boolean
  title: string

}

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (newFilterValue: FiltersType) => void
  addTask: (newTaskTitle: string) => void
}

export const TodoList = (props: TodolistPropsType) => {

  const [inputValue, setInputValue] = useState("");

  const { title, tasks, removeTask, changeFilter, addTask } = props

  const onCkickRemoveTaskHandler = (taskId: string) => {
    removeTask(taskId)
  }

  const onClickChangeFilter = (newFilterValue: FiltersType) => {
    changeFilter(newFilterValue)
  }




  const addTaskOnClick = () => {
    addTask(inputValue)
    setInputValue("")
  }

  const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && addTaskOnClick()
  }

  const onChangeSetNewTitle = (el: ChangeEvent<HTMLInputElement>) => {
    setInputValue(el.target.value)
  }


  const isAddBtnDisabled = !inputValue || inputValue.length > 15
  const messageForUser = inputValue.length <= 15 ? <span>введите новыю таску</span> : <span style={{ color: "red" }}>максимум 15 символов</span>

  return (
    <div className='todolist'>
      <h3>{title}</h3>
      <div>

        <input
          value={inputValue}
          onChange={onChangeSetNewTitle}
          onKeyDown={onKeyDownAddTask}
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
                <input type={"checkbox"} checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => onCkickRemoveTaskHandler(task.id)}>X</button>
              </li>
            )
          })
        }

      </ul>
      <div>
        <button onClick={() => onClickChangeFilter("All")}>All</button>
        <button onClick={() => onClickChangeFilter("Active")}>Active</button>
        <button onClick={() => onClickChangeFilter("Completed")}>Completed</button>
      </div>
    </div>
  )
}


