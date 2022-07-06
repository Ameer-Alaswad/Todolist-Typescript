export const deleteTodoLogic = (event: React.MouseEvent<HTMLButtonElement>,todoListArray:string[])=> {
    const makeTargetAnHtmlElement = event.target as Element
    const selectedTodoList = makeTargetAnHtmlElement.previousElementSibling?.textContent
  const filteredTodoLists =   todoListArray.filter(todo => {
      if(todo === selectedTodoList) return null 
      return todo 
    
    });
    return filteredTodoLists

}