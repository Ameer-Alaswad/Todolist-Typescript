import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    layoutVisibility: boolean
    handleTodoAdd: (event: React.FormEvent<HTMLFormElement>) => void;
    inputValue: string;
    handleTodoInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoForm: React.FC<Props> = ({ layoutVisibility,
    inputValue, handleTodoInput, handleTodoAdd }) => {


    return (
        <>
            { layoutVisibility && (
                <form onSubmit={ handleTodoAdd } className="input-add-button-container">
                    <TextField
                        style={ { width: "430px" } }
                        value={ inputValue }
                        onChange={ handleTodoInput }
                        id="outlined-basic"
                        label="Add a Todo"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        style={ { marginTop: "10px", marginLeft: "10px" } }
                        variant="contained"
                        endIcon={ <AddIcon /> }
                    >
                        Add
                    </Button>
                </form>
            ) }
        </>

    )
}
export default TodoForm