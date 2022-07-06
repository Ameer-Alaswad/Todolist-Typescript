import React,{useState,useId } from "react";

interface Props {}

const TodoList: React.FC<Props> = (props) => {
  let todoId = useId()
  const [todoListArray, setTodoListArray] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const handleTodoAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTodoListArray([...todoListArray,inputValue])
  };
  const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const makeTargetAnHtmlElement = event.target as Element
    const selectedTodoList = makeTargetAnHtmlElement.previousElementSibling?.textContent
  const filteredTodoLists =   todoListArray.filter(todo => {
      if(todo === selectedTodoList) return null 
      return todo 
      
    });
    setTodoListArray(filteredTodoLists);
  };
  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  };
  console.log(inputValue);
  console.log(todoListArray);
  return (
    <div>
      <h1>Add a Todo</h1>
      <input onChange={handleTodoInput} type="text" />
      <button onClick={handleTodoAdd}>Add</button>
      {todoListArray && todoListArray.map((todo,i) =>{
        return <div key={todoId + i}><div>{todo}</div><span onClick={handleDeleteTodo}>x</span></div> 
      })}
    </div>
  );
};
export default TodoList;
