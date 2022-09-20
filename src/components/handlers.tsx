import { addTodos } from "./todListUtils";

export const handleTodoAddLogic = (
    inputValue: string,
    listsInStorage: [],
    todoListArray: any,
    setInputValue: (value: string) => void,
    setTodoListArray: (value: []) => void
) => {
    if (inputValue === "") return alert("Add a todo")
    if (listsInStorage) {
        if (todoListArray.length === 0) {
            setInputValue("")
            return addTodos(listsInStorage, setTodoListArray, inputValue)
        }
        const filteredTodos = todoListArray.map((todo: { todoText: string, checkbox: boolean }) => {
            return todo.todoText
        })
        if (!filteredTodos.includes(inputValue)) {
            setInputValue(" ")
            return addTodos(listsInStorage, setTodoListArray, inputValue)

        }
        return alert('This todo already exist')
    }
};


export const handleCheckBoxLogic = (event: React.ChangeEvent<HTMLInputElement>,
    setTodoListArray: (value: []) => void

) => {
    const checkboxInput = event.target as HTMLElement
    const checkedElement = checkboxInput.parentElement?.nextElementSibling?.textContent
    console.log(checkedElement);

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

}