import Checkbox from "@mui/material/Checkbox";
require("./TodoList.css");


interface Props {
    layoutVisibility: boolean
    checkbox: boolean | undefined
    handleCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
    todo: { todoText: string; checkbox: boolean | undefined }
}

const DisplayTodo: React.FC<Props> = ({ checkbox, handleCheckBox, todo, layoutVisibility }) => {


    return (
        <>
            { layoutVisibility && (
                <div style={ { display: "inline-block" } }>
                    <Checkbox
                        checked={ checkbox }
                        onChange={ handleCheckBox }
                        color="secondary"
                    />
                    <p
                        className={
                            checkbox
                                ? "checked-todo-style"
                                : "unchecked-todo-style"
                        }
                    >
                        { todo?.todoText }
                    </p>
                </div>
            ) }
        </>

    )
}
export default DisplayTodo