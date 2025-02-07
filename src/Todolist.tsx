

import { FiltersType } from './App';
import './App.css';

export type TaskType = {
  id: number
  isDone: boolean
  title: string

}

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter : (newFilterValue : FiltersType) => void
}

export const TodoList = (props: TodolistPropsType) => {

  const { title, tasks , removeTask , changeFilter } = props

  const onCkickRemoveTaskHandler = (taskId: number) => {
    removeTask(taskId)
  }

  const onClickChangeFilter = (newFilterValue : FiltersType) => {
    changeFilter(newFilterValue)
  }



  return (
    <div className='todolist'>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {tasks.length === 0
          ? <span>you list is empty</span>
          : tasks.map(task => {
            return (
              <li key = {task.id}>
                <input type={"checkbox"} checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick = { () => onCkickRemoveTaskHandler(task.id)}>X</button>
              </li>
            )
          })
        }
        {/* <li>
          <input type={"checkbox"} checked={tasks[0].isDone} />
          <span>{tasks[0].title}</span>
          </li>
        <li>
          <input type="checkbox" checked={tasks[1].isDone} />
          <span>{tasks[1].title}</span>
          </li>
        <li><input type="checkbox" checked={tasks[2].isDone} />
        <span>{tasks[2].title}</span>
        </li> */}
      </ul>
      <div>
        <button onClick={ () => onClickChangeFilter("All")}>All</button>
        <button onClick={ () => onClickChangeFilter("Active")}>Active</button>
        <button onClick={ () => onClickChangeFilter("Completed")}>Completed</button>
      </div>
    </div>
  )
}


