import React, { useState, useId } from "react";
import List from "./List";
import { deleteTodoLogic, addTodos } from "./todListUtils";

interface Props {
}

const TodoList: React.FC<Props> = (props) => {
  if (!localStorage.getItem("listsInStorage")) {
    localStorage.setItem("listsInStorage", JSON.stringify([]));
  }
  const listsInStorage = JSON.parse(
    localStorage.getItem("listsInStorage") || "[]"
  );
  //////////////////////////////////////////////////////////////////////////////////////////
  let todoId = useId();
  const [todoListArray, setTodoListArray] = useState<[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  //////////////////////////////////////////////////////////////////////////////////////////////

  const handleTodoAdd = () => {

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
  const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const makeTargetAnHtmlElement = event.target as Element
    const selectedTodoList = makeTargetAnHtmlElement.parentElement?.previousElementSibling?.children[1].textContent

    localStorage.setItem(
      "listsInStorage",
      JSON.stringify(deleteTodoLogic(event, todoListArray, String(selectedTodoList)))
    );
    setTodoListArray(deleteTodoLogic(event, todoListArray, String(selectedTodoList)));
  };
  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const obj = {
    handleTodoInput: handleTodoInput,
    handleTodoAdd: handleTodoAdd,
    handleDeleteTodo: handleDeleteTodo,
    todoId: todoId,
    todoListArray: todoListArray,
    setTodoListArray: setTodoListArray,
    inputValue: inputValue

  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div style={ { display: "flex", height: "100%", justifyContent: "center", alignItems: "center", } } >
      <List { ...obj } />
    </div>

  )
};
export default TodoList;
