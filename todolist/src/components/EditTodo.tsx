import React, { useState } from "react";

interface Props {
    setTodoListArray: (value: string[]) => void
}

const EditTodo: React.FC<Props> = (Props) => {
    const { setTodoListArray } = Props

    const [value, setValue] = useState<string>("");
    const [todoListEditVisibility, setTodoListEditVisibility] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>("");


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        console.log(event.target.value);
    }
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedButton = event.target as Element
        const todoText = clickedButton.parentElement?.previousElementSibling?.previousElementSibling?.textContent
        setValue(String(todoText))
        setTodoText(String(todoText))
        setTodoListEditVisibility(true)
    }
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        const listsInStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]"
        );
        const filteredTodos = listsInStorage.map((todo: string) => {
            if (todo === todoText) return value
            return todo
        })
        localStorage.setItem("listsInStorage", JSON.stringify(filteredTodos))
        setTodoListArray(filteredTodos)
        setTodoListEditVisibility(false)
    }

    return (
        <div>
            <button onClick={ handleEdit }>Edit</button>
            { todoListEditVisibility &&
                <div>
                    <input onChange={ handleChange } value={ value } type="text" />
                    <button onClick={ handleSave }>Save</button>
                </div>
            }
        </div>
    )
}
export default EditTodo
