import React from "react";

import './App.css'
import { TaskType, TodoList } from "./Todolist";



function App() {
    const TodolistTitle1 = 'What to learn';
    const TodolistTitle2 = 'What to buy';

    const tasks_1 : Array<TaskType>= [
      {id: 1 , isDone: true , title: 'HTML&CSS'},
      {id: 2 , isDone: true , title: 'JS'},
      {id: 3 , isDone: false , title: 'React'}
    ]

    const tasks_2 : Array<TaskType>= [
      {id: 6 , isDone: true , title: 'bread'},
      {id: 7 , isDone: true , title: 'tea'},
      {id: 8 , isDone: false , title: 'cofe'}
    ]

  return (
    <div className="App">
        <TodoList title = {TodolistTitle1} tasks = {tasks_1} />
        <TodoList title = {TodolistTitle2} tasks = {tasks_2}/>
    </div>
  );
}

export default App;
