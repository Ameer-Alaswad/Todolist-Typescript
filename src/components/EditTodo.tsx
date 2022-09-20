import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { handleSaveTodoLogic } from "./handlers";
import EditTodoForm from "./EditTodoForm";

interface Props {
    setTodoListArray: (value: []) => void;
    setLayoutVisibility: (value: boolean) => void;
    layoutVisibility: boolean;
}

const EditTodo: React.FC<Props> = (Props) => {
    const { setTodoListArray, setLayoutVisibility, layoutVisibility } = Props;
    ///////////////////////////////////////////////////////////////
    const [value, setValue] = useState<string>("");
    const [todoListEditVisibility, setTodoListEditVisibility] =
        useState<boolean>(false);
    const [emptyInputMessage, setEmptyInputMessage] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    ///////////////////////////////////////////////////////////////////////////////
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    //////////////////////////////////////////////////////////////////////////////////////
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedButton = event.target as HTMLElement;
        const todoText =
            clickedButton.parentElement?.parentElement?.previousElementSibling
                ?.children[1].textContent;

        ////////////////////////////////////////////////////////////////////////////////////////////////
        setValue(String(todoText));
        setTodoText(String(todoText));
        setTodoListEditVisibility(true);
        setLayoutVisibility(false);
    };
    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        handleSaveTodoLogic(
            value,
            setTodoListEditVisibility,
            setLayoutVisibility,
            setErrorMessage,
            setEmptyInputMessage,
            todoText,
            setTodoListArray
        )
    };
    const propsObj = {
        todoListEditVisibility, handleChange, handleSave, value, layoutVisibility
    }
    const editTodoButtonStyle = { height: "35px", marginRight: "5px", width: "65px" }
    return (
        <div style={ { display: "inline-block" } }>
            { layoutVisibility && (
                <Button
                    style={ editTodoButtonStyle }
                    size="small"
                    onClick={ handleEdit }
                    variant="contained"
                    color="success"
                    endIcon={ <EditIcon /> }
                >
                    Edit
                </Button>
            ) }
            <EditTodoForm { ...propsObj } />
            { emptyInputMessage && <div>{ errorMessage }</div> }
        </div>
    );
};
export default EditTodo;
