import React, { useState } from "react";

import './App.css'
import { TaskType, TodoList } from "./Todolist";



export type FiltersType = "All" | "Active" | "Completed"


function App() {
  const TodolistTitle = 'What to learn';

  // const tasks : Array<TaskType>= [
  //   {id: 1 , isDone: true , title: 'HTML&CSS'},
  //   {id: 2 , isDone: true , title: 'JS'},
  //   {id: 3 , isDone: false , title: 'React'},
  //   {id: 4 , isDone: false , title: 'Redux'},
  // ]

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: crypto.randomUUID(), isDone: true, title: 'HTML&CSS' },
    { id: crypto.randomUUID(), isDone: true, title: 'JS' },
    { id: crypto.randomUUID(), isDone: false, title: 'React' },
    { id: crypto.randomUUID(), isDone: true, title: 'Redux' }
  ])



  const removeTask = (taskId: string) => {// удаление таски
    //const nextState: Array<TaskType> = tasks.filter( task => task.id !== taskId)
    setTasks(tasks.filter(task => task.id !== taskId))//  фильтруем таски которые не равны taskId
  }

  const [filterValue, setFlter] = useState<FiltersType>("All");

  const getFilteredtasksForRender = (tasks: TaskType[], filterValue: FiltersType) => {
    switch (filterValue) {
      case "Active":
        return tasks.filter(task => !task.isDone )
      case "Completed":
        return tasks.filter(task => task.isDone )
      default:
        return tasks
    }
  }

  const filteredTasks: TaskType[] = getFilteredtasksForRender(tasks, filterValue)

  const changeFilter = (newFilterValue: FiltersType) => {
    setFlter(newFilterValue)
  }

  const addTask = (newTaskTitle: string) => {
    
    const newTask : TaskType = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      isDone: false
    }
   
    setTasks([...tasks, newTask])// копируем таски и создаём и сразу добавляем новый объект
  }

  return (
    <div className="App">
      <TodoList
        title={TodolistTitle}
        tasks={filteredTasks}
        removeTask={removeTask}
        addTask = {addTask}
        changeFilter={changeFilter} />
    </div>
  );
}

export default App;
