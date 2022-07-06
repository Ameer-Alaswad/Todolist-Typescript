import React, { useState, useId } from "react";
import { deleteTodoLogic } from "./todListUtils";

interface Props { }

const TodoList: React.FC<Props> = (props) => {

  if (!localStorage.getItem('listsInStorage')) {
    localStorage.setItem('listsInStorage', JSON.stringify([]));
  }
  const listsInStorage = JSON.parse(localStorage.getItem('listsInStorage') || '[]');
//////////////////////////////////////////////////////////////////////////////////////////
  let todoId = useId()
  const [todoListArray, setTodoListArray] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>("")
//////////////////////////////////////////////////////////////////////////////////////////////
  const handleTodoAdd = () => {
    localStorage.setItem('listsInStorage', JSON.stringify([...listsInStorage, inputValue]))
    setTodoListArray(JSON.parse(localStorage.getItem('listsInStorage') || '[]'))
  };
  const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem('listsInStorage', JSON.stringify(deleteTodoLogic(event, todoListArray)))
    setTodoListArray(deleteTodoLogic(event, todoListArray))
  };
  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  };
//////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h1>Add a Todo</h1>
      <input onChange={ handleTodoInput } type="text" />
      <button onClick={ handleTodoAdd }>Add</button>
      { todoListArray && todoListArray.map((todo: string, i: number) => {
        return <div key={ todoId + i }><div>{ todo }</div><span onClick={ handleDeleteTodo }>x</span></div>
      }) }
    </div>
  );
};
export default TodoList;
