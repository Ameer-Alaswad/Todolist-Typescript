import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

interface Props {
    setTodoListArray: (value: []) => void
    setLayoutVisibility: (value: boolean) => void
    layoutVisibility: boolean
}

const EditTodo: React.FC<Props> = (Props) => {
    const { setTodoListArray, setLayoutVisibility, layoutVisibility } = Props
    ///////////////////////////////////////////////////////////////
    const [value, setValue] = useState<string>("");
    const [todoListEditVisibility, setTodoListEditVisibility] = useState<boolean>(false);
    const [emptyInputMessage, setEmptyInputMessage] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    ///////////////////////////////////////////////////////////////////////////////
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    //////////////////////////////////////////////////////////////////////////////////////
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedButton = event.target as HTMLElement
        const todoText = clickedButton.parentElement?.parentElement?.previousElementSibling?.children[1].textContent


        ////////////////////////////////////////////////////////////////////////////////////////////////
        setValue(String(todoText))
        setTodoText(String(todoText))
        setTodoListEditVisibility(true)
        setLayoutVisibility(false)
    }
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        const filteredTodoTects: string[] = []
        setLayoutVisibility(true)
        const listsInStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]"
        );
        listsInStorage.forEach((todo: { todoText: string, checkbox: boolean }) => {
            console.log(todoText, todo.todoText);

            if (todo.todoText !== todoText) {

                return filteredTodoTects.push(todo.todoText)
            }
        })
        console.log({ filteredTodoTects });

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

    return (
        <div style={ { display: 'inline-block' } }>
            { layoutVisibility && <Button style={ { height: "35px", marginRight: '5px', width: '65px' } } size="small" onClick={ handleEdit } variant="contained" color="success" endIcon={ <EditIcon /> }>
                Edit
            </Button> }
            { todoListEditVisibility &&
                <div style={ !layoutVisibility ? { marginTop: '200px', display: 'flex', zIndex: '10000' } :
                    { marginTop: '0px', display: 'inline-block', zIndex: '10000' } }>
                    <TextField size="small" style={ { width: '430px', marginRight: '10px' } } value={ value } onChange={ handleChange } id="outlined-basic" label="Edit your Todo" variant="outlined" />
                    <Button style={ { height: "40px", marginRight: '5px', width: '75px' } } size="small" onClick={ handleSave } variant="contained" color="success" endIcon={ <SaveIcon /> }>save</Button>
                </div>
            }
            { emptyInputMessage && <div>{ errorMessage }</div> }

        </div>
    )
}
export default EditTodo
