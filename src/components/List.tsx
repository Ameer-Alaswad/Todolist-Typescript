import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
require('./TodoList.css');

interface Props {
    handleTodoInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleTodoAdd: (event: React.FormEvent<HTMLFormElement>) => void
    todoListArray: []
    todoId: string
    handleDeleteTodo: (event: React.MouseEvent<HTMLButtonElement>) => void
    setTodoListArray: (value: []) => void
    inputValue: string


}
const List: React.FC<Props> = (Props) => {
    const [layoutVisibility, setLayoutVisibility] = useState<boolean>(true);
    const { handleTodoInput, handleTodoAdd,
        todoListArray, todoId,
        handleDeleteTodo, setTodoListArray, inputValue }
        = Props
    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxInput = event.target as HTMLElement
        const checkedElement = checkboxInput.parentElement?.nextElementSibling?.textContent
        console.log(checkedElement);

        const listFromStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]")
        const filteredElements = listFromStorage.map((checked: { todoText: string, checkbox: boolean }) => {
            if (checkedElement === checked.todoText) {
                checked.checkbox = !checked.checkbox
                return checked
            }
            return checked
        })
        localStorage.setItem(
            "listsInStorage",
            JSON.stringify(filteredElements)
        );
        setTodoListArray(filteredElements)
    };
    useEffect(() => {
        const listFromStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]")
        setTodoListArray(listFromStorage)

    }, [setTodoListArray]);
    const obj = {
        setTodoListArray: setTodoListArray, setLayoutVisibility: setLayoutVisibility,
        layoutVisibility: layoutVisibility, handleDeleteTodo, todoListArray
    }
    return (
        <div className="todolist-content-container" >
            <h1 className="site-title">My TodoList</h1>
            { layoutVisibility && <form onSubmit={ handleTodoAdd } className="input-add-button-container" >
                <TextField style={ { width: '430px' } } value={ inputValue } onChange={ handleTodoInput } id="outlined-basic" label="Add a Todo" variant="outlined" />
                <Button type="submit" style={ { marginTop: "10px", marginLeft: '10px' } } variant="contained" endIcon={ <AddIcon /> }>
                    Add
                </Button>
            </form> }
            <div style={ { height: '450px', overflow: 'auto' } }>
                { todoListArray && todoListArray.map((todo: { todoText: string, checkbox: boolean | undefined }, i: number) => {
                    const checkbox = todo?.checkbox
                    return <div className={ layoutVisibility ? "todo-container" : "absko" } key={ todoId + i }>
                        { layoutVisibility &&
                            <div style={ { display: 'inline-block' } }>
                                <Checkbox checked={ checkbox } onChange={ handleCheckBox } color="secondary" />
                                <p style={ checkbox ?
                                    { color: 'blue', textDecoration: "line-through", display: 'inline-block', } : { display: 'inline-block' } }>
                                    { todo?.todoText }</p>
                            </div>

                        }
                        <div style={ { display: "flex", alignItems: 'center' } }>


                            <EditTodo { ...obj } />
                            { layoutVisibility && <Button style={ { height: "35px", width: '90px' } } size="small" color="error" onClick={ handleDeleteTodo } variant="outlined" startIcon={ <DeleteIcon /> }>
                                Delete
                            </Button> }
                        </div>
                    </div>
                }) }
            </div>
            { !layoutVisibility && <div style={ {
                position: 'absolute', left: '0', right: '0', top: '0', bottom: '0',
                backgroundColor: 'black', opacity: '0.3', height: '100vh', width: '100vw', zIndex: '-1'
            } }></div> }
        </div>
    )
}
export default List