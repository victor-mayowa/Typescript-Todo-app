import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Todo from '../Model'
import SingleTodo from './SingleTodo'

interface Props {
  todoListArr: Todo[],
  setTodoListArr: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodo: Todo[],
  setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({ todoListArr, setTodoListArr, completedTodo, setCompletedTodo }: Props) => {
  return (
    <div className="container">

      <Droppable droppableId='TodoList'>
        {(provided, snapshot) => (
          <div 
            className={`todos ${snapshot.isDraggingOver ? "dragComplete" : ""}`}
            ref={provided.innerRef} 
            {...provided.droppableProps}
            >

            <span className='todos__heading'>Active Tasks</span>

            {todoListArr.map((todo, index) => (
              <SingleTodo
                key={todo.id}
                index={index}
                todo={todo}
                todoListArr={todoListArr}
                setTodoListArr={setTodoListArr}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId='TodoRemove'>
        {(provided, snapshot) => (
          <div 
            className={`todos remove ${snapshot.isDraggingOver ? "dragActive" :"remove"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            >

            <span className='todos__heading'>Completed Tasks</span>

            {completedTodo.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todoListArr={completedTodo}
                setTodoListArr={setCompletedTodo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  )
}

export default TodoList