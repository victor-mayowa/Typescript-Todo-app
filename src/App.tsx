import React, { useState } from 'react';
import './App.css';
import InputFields from './Components/InputFields';
import Todo from './Model';
import TodoList from './Components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todoListArr, setTodoListArr] = useState<Todo[]>([])
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodoListArr([...todoListArr, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }
  
  const onDragEnd = (result: DropResult) =>{
    const {destination, source} = result

    if(!destination) {
      return
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }

    let add
    let active = todoListArr;
    let complete = completedTodo

    if(source.droppableId === "TodoList"){
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === "TodoList"){
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    console.log(result)
    
  }
  console.log(todoListArr)
  console.log(completedTodo)



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1 className='heading'>Taskify</h1>
        <InputFields todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todoListArr={todoListArr} setTodoListArr={setTodoListArr} completedTodo={completedTodo} setCompletedTodo={setCompletedTodo} />
      </div>
    </DragDropContext>       

  );
}

export default App;
