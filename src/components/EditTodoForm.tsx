
import SaveIcon from "@mui/icons-material/Save";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
require("./TodoList.css");
interface Props {
    todoListEditVisibility: boolean
    handleSave: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string
    layoutVisibility: boolean
}

const EditTodoForm: React.FC<Props> = ({ todoListEditVisibility, handleChange, handleSave, value, layoutVisibility }) => {

    const editTodoInputStyles = { width: "430px", marginRight: "10px" }
    const editTodoButtonStyles = { height: "40px", marginRight: "5px", width: "75px" }

    return (
        <>
            { todoListEditVisibility && (
                <form
                    onSubmit={ handleSave }
                    className={
                        !layoutVisibility
                            ? "edit-todo-form-visible"
                            : "edit-todo-form-invisible"
                    }
                >
                    <TextField
                        size="small"
                        style={ editTodoInputStyles }
                        value={ value }
                        onChange={ handleChange }
                        id="outlined-basic"
                        label="Edit your Todo"
                        variant="outlined"
                    />
                    <Button
                        style={ editTodoButtonStyles }
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
        </>

    )
}
export default EditTodoForm