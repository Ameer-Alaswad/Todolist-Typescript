require("./TodoList.css");

interface Props {
    layoutVisibility: boolean
    setLayoutVisibility: (value: boolean) => void;
}

const EditModel: React.FC<Props> = ({ layoutVisibility }) => {


    return (
        <>
            { !layoutVisibility && (
                <div
                    className="edit-todo-model"
                ></div>
            )
            }
        </>

    )
}
export default EditModel