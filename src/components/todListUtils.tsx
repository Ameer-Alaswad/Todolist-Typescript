export const deleteTodoLogic = (
  event: React.MouseEvent<HTMLButtonElement>,
  todoListArray: any,
  selectedTodoList: string
) => {
  const filteredTodoLists = todoListArray.filter(
    (todo: { todoText: string; checkbox: boolean }) => {
      if (todo?.todoText === selectedTodoList) return null;
      return todo;
    }
  );
  return filteredTodoLists;
};
//its add todos to the localStorage and the state
export const addTodos = (
  listsInStorage: [],
  setTodoListArray: (value: []) => void,
  inputValue: string
) => {
  const todoData = {
    todoText: inputValue,
    checkbox: false,
  };
  localStorage.setItem(
    "listsInStorage",
    JSON.stringify([...listsInStorage, todoData])
  );
  setTodoListArray(JSON.parse(localStorage.getItem("listsInStorage") || "[]"));
};

export const todoListValueChecker = (value: string,
  setTodoListEditVisibility: (value: boolean) => void,
  setLayoutVisibility: (value: boolean) => void,
  setErrorMessage: (value: string) => void,
  setEmptyInputMessage: (value: boolean) => void,
  filteredTodoTects: string[],
  todoText: string,
  setTodoListArray: (value: []) => void,
) => {
  const listsInStorage = JSON.parse(
    localStorage.getItem("listsInStorage") || "[]"
  );
  const filteredTodos = listsInStorage.map((todo: { todoText: string, checkbox: boolean }) => {

    if (value === '') {
      setTodoListEditVisibility(true)
      setLayoutVisibility(false)
      setErrorMessage("Add something or save then delete the Todo")
      return setEmptyInputMessage(true)
    }
    if (filteredTodoTects.includes(value)) {
      setTodoListEditVisibility(true)
      setLayoutVisibility(false)
      setErrorMessage("This Todo already exist")
      return setEmptyInputMessage(true)

    }

    if (todo.todoText === todoText) {
      todo.todoText = value
    }
    return todo


  })
  if (filteredTodos[0] !== undefined) {
    localStorage.setItem("listsInStorage", JSON.stringify(filteredTodos))
    setTodoListArray(filteredTodos)
    setTodoListEditVisibility(false)
    setEmptyInputMessage(false)
  }

}
