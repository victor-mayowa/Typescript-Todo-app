import React, { useEffect, useRef, useState } from 'react'
import Todo from '../Model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "./style.css"
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    index: number,
    todo: Todo,
    todoListArr: Todo[],
    setTodoListArr: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ index, todo, todoListArr, setTodoListArr }: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
        setTodoListArr(todoListArr.map((list) => {
            return list.id === id ? { ...list, isDone: !list.isDone } : list
        }))
    }

    const handleDelete = (id: number) => {
        setTodoListArr(todoListArr.filter((list) => {
            return list.id !== id
        }))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        setTodoListArr(todoListArr.map((list) => {
            return todo.id === id ? { ...list, todo: editTodo } : list
        }))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>

            {(provided, snapshot) => (
                <form 
                className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
                onSubmit={(e) => handleEdit(e, todo.id)} 
                {...provided.draggableProps} 
                {...provided.dragHandleProps} 
                ref={provided.innerRef}
                >

                    {edit ? (
                       <input 
                         className="todos__text"
                         ref={inputRef}
                         value={editTodo}
                         onChange={(e) => setEditTodo(e.target.value)}
                        />
                    ) : todo.isDone ? (
                    <s className='todos__text'>{todo.todo}</s> 
                    ) : (<span className='todos__text'>{todo.todo}</span>
                    )}
                     <div>

                        <span
                            className='todos__icons'
                            onClick={() => {
                                if (!todo.isDone) {
                                    setEdit(!edit)
                                }
                            }}>
                            <AiFillEdit />
                        </span>

                        <span
                            className='todos__icons'
                            onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>

                        <span
                            className='todos__icons'
                            onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}

        </Draggable>
    )
}

export default SingleTodo