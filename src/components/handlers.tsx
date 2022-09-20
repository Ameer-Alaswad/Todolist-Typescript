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