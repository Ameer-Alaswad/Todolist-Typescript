export const deleteTodoLogic = (event: React.MouseEvent<HTMLButtonElement>, todoListArray: any, selectedTodoList: string) => {

  const filteredTodoLists = todoListArray.filter((todo: { todoText: string, checkbox: boolean }) => {

    if (todo?.todoText === selectedTodoList) return null
    return todo

  });
  return filteredTodoLists

}
//its add todos to the localStorage and the state
export const addTodos = (listsInStorage: [], setTodoListArray: (value: []) => void, inputValue: string) => {
  const todoData = {
    todoText: inputValue,
    checkbox: false
  }
  localStorage.setItem(
    "listsInStorage",
    JSON.stringify([...listsInStorage, todoData])
  );
  setTodoListArray(
    JSON.parse(localStorage.getItem("listsInStorage") || "[]")
  );
}