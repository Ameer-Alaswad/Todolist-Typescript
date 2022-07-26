export const deleteTodoLogic = (event: React.MouseEvent<HTMLButtonElement>, todoListArray: string[]) => {
  const makeTargetAnHtmlElement = event.target as Element
  const selectedTodoList = makeTargetAnHtmlElement.previousElementSibling?.previousElementSibling?.textContent
  const filteredTodoLists = todoListArray.filter((todo: any) => {
    console.log(todo);

    if (todo.todoText === selectedTodoList) return null
    return todo

  });
  return filteredTodoLists

}
//its add todos to the localStorage and the state
export const addTodos = (listsInStorage: string[], setTodoListArray: (value: string[]) => void, inputValue: string) => {
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