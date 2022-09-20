import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { handleSaveTodoLogic } from "./handlers";

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

    return (
        <div style={ { display: "inline-block" } }>
            { layoutVisibility && (
                <Button
                    style={ { height: "35px", marginRight: "5px", width: "65px" } }
                    size="small"
                    onClick={ handleEdit }
                    variant="contained"
                    color="success"
                    endIcon={ <EditIcon /> }
                >
                    Edit
                </Button>
            ) }
            { todoListEditVisibility && (
                <form
                    onSubmit={ handleSave }

                    style={
                        !layoutVisibility
                            ? { marginTop: "200px", display: "flex", zIndex: "10000" }
                            : { marginTop: "0px", display: "inline-block", zIndex: "10000" }
                    }
                >
                    <TextField
                        size="small"
                        style={ { width: "430px", marginRight: "10px" } }
                        value={ value }
                        onChange={ handleChange }
                        id="outlined-basic"
                        label="Edit your Todo"
                        variant="outlined"
                    />
                    <Button
                        style={ { height: "40px", marginRight: "5px", width: "75px" } }
                        size="small"
                        variant="contained"
                        color="success"
                        type="submit"
                        endIcon={ <SaveIcon /> }
                    >
                        save
                    </Button>
                </form>
            ) }
            { emptyInputMessage && <div>{ errorMessage }</div> }
        </div>
    );
};
export default EditTodo;
