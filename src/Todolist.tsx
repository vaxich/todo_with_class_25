

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FiltersType } from './App';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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
  updateTask: (todolistId: string, taskId: string, newTitle: string) => void
  updateTodolist: (todolistId: string, newTitle: string) => void
}

export const TodoList = (props: TodolistPropsType) => {

  const { title, tasks, todolistId, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, filterValue, updateTask, updateTodolist } = props

  const onCkickRemoveTaskHandler = (taskId: string) => {
    removeTask(todolistId, taskId)
  }

  const onClickChangeFilter = (newFilterValue: FiltersType) => {
    changeFilter(todolistId, newFilterValue)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const addTaskHandler = (newTitle: string) => {
    addTask(todolistId, newTitle)
  }

  const updateTodolistHandler = (newTitle: string) => {
    updateTodolist(todolistId, newTitle)
  }

  const updateTaskHandler = (taskId: string, newTitle: string) => {
    updateTask(todolistId, taskId, newTitle)
  }


  return (
    <div className='todolist'>

      <EditableSpan title={title} onClick={updateTodolistHandler} />
      <button onClick={removeTodolistHandler}>X</button>
      <div>
        <AddItemForm onClick={addTaskHandler} />

      </div>
      <ul>
        {tasks.length === 0
          ? <span>you list is empty</span>
          : tasks.map(task => {

            // const updateTaskHandler = (newTitle: string) => {
            //   updateTask(todolistId, task.id, newTitle)
            // }

            return (
              <li key={task.id}>
                <input
                  type={"checkbox"}
                  checked={task.isDone}
                  onChange={() => { changeTaskStatus(todolistId, task.id) }}

                />
                {/* <span className={task.isDone ? "task_done" : "task"} >{task.title}</span> */}
                <EditableSpan title={task.title} isDone={task.isDone} onClick={ (newTitle)=> updateTaskHandler(task.id , newTitle)} />
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


