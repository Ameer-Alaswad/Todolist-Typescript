import React, { useState } from "react";

interface Props {
    setTodoListArray: (value: []) => void
    setLayoutVisibility: (value: boolean) => void
    layoutVisibility: boolean
}

const EditTodo: React.FC<Props> = (Props) => {
    const { setTodoListArray, setLayoutVisibility, layoutVisibility } = Props
    ///////////////////////////////////////////////////////////////
    const [value, setValue] = useState<string>("");
    const [todoListEditVisibility, setTodoListEditVisibility] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>("");
    ///////////////////////////////////////////////////////////////////////////////
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    //////////////////////////////////////////////////////////////////////////////////////
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedButton = event.target as HTMLElement
        const todoText = clickedButton.parentElement?.previousElementSibling?.children[0].textContent
        ////////////////////////////////////////////////////////////////////////////////////////////////
        setValue(String(todoText))
        setTodoText(String(todoText))
        setTodoListEditVisibility(true)
        setLayoutVisibility(false)
    }
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLayoutVisibility(true)
        const listsInStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]"
        );
        const filteredTodos = listsInStorage.map((todo: { todoText: string, checkbox: boolean }) => {
            if (value === '') {
                setTodoListEditVisibility(true)
                setLayoutVisibility(false)
                return alert('something')
            }

            if (todo.todoText === todoText) {
                todo.todoText = value
                return todo
            }
            return todo
        })
        if (filteredTodos[0] !== undefined) {
            localStorage.setItem("listsInStorage", JSON.stringify(filteredTodos))
            setTodoListArray(filteredTodos)
            setTodoListEditVisibility(false)
        }
    }

    return (
        <div style={ { display: 'inline-block' } }>
            { layoutVisibility && <button onClick={ handleEdit }>Edit</button> }
            { todoListEditVisibility &&
                <div style={ !layoutVisibility ? { marginTop: '20px', display: 'inline-block', zIndex: '10000' } :
                    { marginTop: '0px', display: 'inline-block', zIndex: '10000' } }>
                    <input style={ { width: '350px', } } onChange={ handleChange } value={ value } type="text" />
                    <button onClick={ handleSave }>Save</button>
                </div>
            }
        </div>
    )
}
export default EditTodo
