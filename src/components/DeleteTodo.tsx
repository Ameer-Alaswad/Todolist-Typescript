import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    layoutVisibility: boolean
    handleDeleteTodo: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoForm: React.FC<Props> = ({ layoutVisibility,
    handleDeleteTodo }) => {


    return (
        <>
            { layoutVisibility && (
                <Button
                    style={ { height: "35px", width: "90px" } }
                    size="small"
                    color="error"
                    onClick={ handleDeleteTodo }
                    variant="outlined"
                    startIcon={ <DeleteIcon /> }
                >
                    Delete
                </Button>
            ) }
        </>

    )
}
export default TodoForm