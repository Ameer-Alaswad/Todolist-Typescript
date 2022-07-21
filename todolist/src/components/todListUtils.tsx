export const deleteTodoLogic = (event: React.MouseEvent<HTMLButtonElement>, todoListArray: string[]) => {
  const makeTargetAnHtmlElement = event.target as Element
  const selectedTodoList = makeTargetAnHtmlElement.previousElementSibling?.textContent
  const filteredTodoLists = todoListArray.filter(todo => {
    if (todo === selectedTodoList) return null
    return todo

  });
  return filteredTodoLists

}
//its add todos to the localStorage and the state
export const addTodos = (listsInStorage: string[], setTodoListArray: (value: string[]) => void, inputValue: string) => {
  localStorage.setItem(
    "listsInStorage",
    JSON.stringify([...listsInStorage, inputValue])
  );
  setTodoListArray(
    JSON.parse(localStorage.getItem("listsInStorage") || "[]")
  );
}