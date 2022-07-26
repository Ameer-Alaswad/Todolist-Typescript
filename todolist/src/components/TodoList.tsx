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
  const [todoListArray, setTodoListArray] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");

  //////////////////////////////////////////////////////////////////////////////////////////////

  const handleTodoAdd = () => {
    if (listsInStorage) {
      if (todoListArray.length === 0) {
        console.log(listsInStorage);
        return addTodos(listsInStorage, setTodoListArray, inputValue)
      }
      const filteredTodos = todoListArray.map((todo: any) => {
        return todo.todoText
      })
      if (!filteredTodos.includes(inputValue)) {
        return addTodos(listsInStorage, setTodoListArray, inputValue)
      }
      return alert('exist')
    }
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
  return (
    <div >
      <List { ...obj } />
    </div>

  )
};
export default TodoList;
