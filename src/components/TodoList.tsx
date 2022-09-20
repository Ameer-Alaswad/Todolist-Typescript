import React, { useState, useId } from "react";
import { handleTodoAddLogic } from "./handlers";
import List from "./List";
import { deleteTodoLogic } from "./todListUtils";
require("./TodoList.css")
interface Props {
}

const TodoList: React.FC<Props> = () => {
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

  const handleTodoAdd = () => {
    handleTodoAddLogic(inputValue,
      listsInStorage,
      todoListArray,
      setInputValue,
      setTodoListArray)
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
    handleTodoInput,
    handleTodoAdd,
    handleDeleteTodo,
    todoId,
    todoListArray,
    setTodoListArray,
    inputValue

  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="site-container" >
      <List { ...obj } />
    </div>

  )
};
export default TodoList;
