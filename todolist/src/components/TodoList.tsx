import React, { useState, useId, useEffect } from "react";
import List from "./List";
import { deleteTodoLogic } from "./todListUtils";

interface Props { }

const TodoList: React.FC<Props> = (props) => {
  if (!localStorage.getItem("listsInStorage")) {
    localStorage.setItem("listsInStorage", JSON.stringify([]));
  }
  const listsInStorage = JSON.parse(
    localStorage.getItem("listsInStorage") || "[]"
  );
  //////////////////////////////////////////////////////////////////////////////////////////
  let todoId = useId();
  const [todoListArray, setTodoListArray] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  //////////////////////////////////////////////////////////////////////////////////////////////

  //  ////////////////////////////////////////////
  const handleTodoAdd = () => {
    localStorage.setItem(
      "listsInStorage",
      JSON.stringify([...listsInStorage, inputValue])
    );
    setTodoListArray(
      JSON.parse(localStorage.getItem("listsInStorage") || "[]")
    );
  };
  const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem(
      "listsInStorage",
      JSON.stringify(deleteTodoLogic(event, todoListArray))
    );
    setTodoListArray(deleteTodoLogic(event, todoListArray));
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
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  return <List { ...obj } />;
};
export default TodoList;
