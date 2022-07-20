import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

interface Props {
    handleTodoInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleTodoAdd: () => void
    todoListArray: string[]
    todoId: string
    handleDeleteTodo: (event: React.MouseEvent<HTMLButtonElement>) => void
    setTodoListArray: (value: string[]) => void
}

const List: React.FC<Props> = (Props) => {
    const { handleTodoInput, handleTodoAdd,
        todoListArray, todoId,
        handleDeleteTodo, setTodoListArray, }
        = Props
    useEffect(() => {
        const listFromStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]")
        setTodoListArray(listFromStorage)
    }, []);
    const obj = { setTodoListArray: setTodoListArray }
    return (
        <div>
            <h1>Add a Todo</h1>
            <input onChange={ handleTodoInput } type="text" />
            <button onClick={ handleTodoAdd }>Add</button>
            { todoListArray && todoListArray.map((todo: string, i: number) => {
                return <div key={ todoId + i }>
                    <div>{ todo }</div><span onClick={ handleDeleteTodo }>x</span>
                    <EditTodo { ...obj } />
                </div>
            }) }
        </div>
    )
}
export default List