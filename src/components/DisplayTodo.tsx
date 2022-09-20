import Checkbox from "@mui/material/Checkbox";


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
                        style={
                            checkbox
                                ? {
                                    color: "blue",
                                    textDecoration: "line-through",
                                    display: "inline-block",
                                }
                                : { display: "inline-block" }
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