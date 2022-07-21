import React, { useState } from "react";

interface Props {
    setTodoListArray: (value: string[]) => void
    setLayoutVisible: (value: boolean) => void
    layoutVisible: boolean
}

const EditTodo: React.FC<Props> = (Props) => {
    const { setTodoListArray, setLayoutVisible, layoutVisible } = Props

    const [value, setValue] = useState<string>("");
    const [todoListEditVisibility, setTodoListEditVisibility] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>("");


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        console.log(event.target.value);
    }
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedButton = event.target as HTMLElement
        let todoText = clickedButton.parentElement?.previousElementSibling?.previousElementSibling?.textContent
        const selectedTodo = clickedButton.parentElement?.previousElementSibling?.previousElementSibling as HTMLElement
        const editButton = clickedButton.parentElement?.children[0] as HTMLElement
        const deleteButton = clickedButton.parentElement?.previousElementSibling as HTMLElement
        // const editTodoContainer = clickedButton.parentElement?.parentElement?.children[2] as HTMLElement
        // console.log(clickedButton.parentElement);

        // editTodoContainer.style.zIndex = '1000'
        deleteButton.style.display = 'none'
        selectedTodo.style.display = 'none'
        editButton.style.display = 'none'
        setValue(String(todoText))
        setTodoText(String(todoText))
        setTodoListEditVisibility(true)
        setLayoutVisible(true)
    }
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedButton = event.target as HTMLElement
        const selectedTodo = clickedButton.parentElement?.parentElement?.parentElement?.children[0] as HTMLElement
        const deleteButton = clickedButton.parentElement?.parentElement?.parentElement?.children[1] as HTMLElement
        const editButton = clickedButton.parentElement?.parentElement?.children[0] as HTMLElement
        deleteButton.style.display = 'inline'
        selectedTodo.style.display = 'inline'
        editButton.style.display = 'inline'
        ////////////////////////////////////////////////////////
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
        setLayoutVisible(false)
    }

    return (
        <div style={ { display: 'inline-block' } }>
            <button onClick={ handleEdit }>Edit</button>
            { todoListEditVisibility &&
                <div style={ { display: 'inline-block' } }>
                    <input style={ { width: '350px', } } onChange={ handleChange } value={ value } type="text" />
                    <button onClick={ handleSave }>Save</button>
                </div>
            }
        </div>
    )
}
export default EditTodo
