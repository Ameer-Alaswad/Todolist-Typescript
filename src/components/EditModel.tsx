interface Props {
    layoutVisibility: boolean
    setLayoutVisibility: (value: boolean) => void;
}

const EditModel: React.FC<Props> = ({ layoutVisibility }) => {


    return (
        <>
            { !layoutVisibility && (
                <div
                    style={ {
                        position: "absolute",
                        left: "0",
                        right: "0",
                        top: "0",
                        bottom: "0",
                        height: "100vh",
                        width: "100vw",
                        zIndex: "-1",
                    } }
                ></div>
            )
            }
        </>

    )
}
export default EditModel