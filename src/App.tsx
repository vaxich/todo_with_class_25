import React, { useState } from "react";

import './App.css'
import { TaskType, TodoList } from "./Todolist";
import { AddItemForm } from "./AddItemForm";



export type FiltersType = "All" | "Active" | "Completed"

type todolistType = {
  id: string,
  title: string,
  filter: FiltersType
}


function App() {
  //const TodolistTitle = 'What to learn';
  let todoListId1 = crypto.randomUUID();
  let todolistId2 = crypto.randomUUID();

  const [todolists, setTodolists] = useState<todolistType[]>([
    { id: todoListId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" }
  ]
  )




  const [tasks, setTasks] = useState({
    [todoListId1]: [
      { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'React', isDone: false },
      { id: crypto.randomUUID(), title: 'Redux', isDone: true }
    ],
    [todolistId2]: [
      { id: crypto.randomUUID(), title: 'bread', isDone: true },
      { id: crypto.randomUUID(), title: 'tea', isDone: true },
      { id: crypto.randomUUID(), title: 'milk', isDone: false },
      { id: crypto.randomUUID(), title: 'sigi', isDone: true }
    ]
  })

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const removeTask = (todolistId: string, taskId: string) => {// удаление таски  
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }


  const changeFilter = (todolistId: string, newFilterValue: FiltersType) => {
    let newTodolistsState = todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newFilterValue } : tl)
    setTodolists(newTodolistsState)
    //setFlter(newFilterValue)
  }

  const addTask = (todolistId: string, newTaskTitle: string) => {

    const newTask = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      isDone: false
    }

    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })// копируем таски и создаём и сразу добавляем новый объект
  }

  const addTodolist = (newTitle: string) => {
    const newTodolistId = crypto.randomUUID()
    const newTodolist : todolistType = {
      id: newTodolistId ,
      title: newTitle,
      filter: "All"
    }

    setTodolists([...todolists, newTodolist]);
    setTasks({...tasks, [newTodolistId]: []});

  }

  const changeTaskStatus = (todolistId: string, taskId: string) => {

    // let newTasks = tasks.map(task => task.id === taskId
    //   ? { ...task, isDone: !task.isDone }
    //   : task)
    // setTasks(newTasks)
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: !task.isDone } : task) })
  }

  const updateTaks = (todolistId: string, taskId: string, newTitle: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
  }

  const updateTodolist = (todolistId: string ,  newTitle: string) => {
    //let newState = todolists.map( tl => tl.id == todolistId ? {...tl, title:newTitle } : tl)
    setTodolists( todolists.map( tl => tl.id == todolistId ? {...tl, title:newTitle } : tl))
  }

  return (
    <div className="App">
      <AddItemForm onClick={addTodolist} />

      {todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "Active") {
          tasksForTodolist = tasks[tl.id].filter(task => task.isDone === false)
        }
        if (tl.filter === "Completed") {
          tasksForTodolist = tasks[tl.id].filter(task => task.isDone === true)
        }



        return (
          <TodoList
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            filterValue={tl.filter}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            changeFilter={changeFilter} 
            updateTask={updateTaks}
            updateTodolist={updateTodolist}
            />
        )
      })}

    </div>
  );
}

export default App;
