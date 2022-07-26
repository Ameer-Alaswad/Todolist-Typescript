import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

interface Props {
    handleTodoInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleTodoAdd: () => void
    todoListArray: []
    todoId: string
    handleDeleteTodo: (event: React.MouseEvent<HTMLButtonElement>) => void
    setTodoListArray: (value: []) => void

}
const List: React.FC<Props> = (Props) => {
    const [layoutVisibility, setLayoutVisibility] = useState<boolean>(true);
    const { handleTodoInput, handleTodoAdd,
        todoListArray, todoId,
        handleDeleteTodo, setTodoListArray }
        = Props
    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxInput = event.target as HTMLElement
        const checkedElement = checkboxInput.previousElementSibling?.textContent
        const listFromStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]")
        const filteredElements = listFromStorage.map((checked: { todoText: string, checkbox: boolean }) => {
            if (checkedElement === checked.todoText) {
                checked.checkbox = !checked.checkbox
                return checked
            }
            return checked
        })
        localStorage.setItem(
            "listsInStorage",
            JSON.stringify(filteredElements)
        );
        setTodoListArray(filteredElements)
    };
    useEffect(() => {
        const listFromStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]")
        setTodoListArray(listFromStorage)

    }, []);
    const obj = {
        setTodoListArray: setTodoListArray, setLayoutVisibility: setLayoutVisibility,
        layoutVisibility: layoutVisibility, handleDeleteTodo, todoListArray
    }
    return (
        <div  >
            <h1>Ameer's TodoList</h1>
            { layoutVisibility && <div>
                <input onChange={ handleTodoInput } type="text" />
                <button onClick={ handleTodoAdd }>Add</button>
            </div> }
            { todoListArray && todoListArray.map((todo: { todoText: string, checkbox: boolean | undefined }, i: number) => {
                const checkbox = todo.checkbox
                return <div key={ todoId + i }>
                    { layoutVisibility && <div style={ { display: 'inline-block' } }>
                        <div style={ checkbox ?
                            { color: 'blue', display: 'inline-block' } : { display: 'inline-block' } }>
                            { todo.todoText }</div>
                        <input type="checkbox" checked={ checkbox } onChange={ handleCheckBox } />
                        <button onClick={ handleDeleteTodo }>x</button></div> }
                    <EditTodo { ...obj } />
                </div>
            }) }
            { !layoutVisibility && <div style={ {
                position: 'absolute', left: '0', right: '0', top: '0', bottom: '0',
                backgroundColor: 'black', opacity: '0.3', height: '100vh', width: '100vw', zIndex: '-1'
            } }></div> }
        </div>
    )
}
export default List