import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import { handleCheckBoxLogic } from "./handlers";
import EditModel from "./EditModel";
import TodoForm from "./TodoForm";
import DeleteTodo from "./DeleteTodo"
import DisplayTodo from "./DisplayTodo"
require("./TodoList.css");

interface Props {
    handleTodoInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTodoAdd: (event: React.FormEvent<HTMLFormElement>) => void;
    todoListArray: [];
    todoId: string;
    handleDeleteTodo: (event: React.MouseEvent<HTMLButtonElement>) => void;
    setTodoListArray: (value: []) => void;
    inputValue: string;
}

const List: React.FC<Props> = (Props) => {
    const [layoutVisibility, setLayoutVisibility] = useState<boolean>(true);
    const {
        handleTodoInput,
        handleTodoAdd,
        todoListArray,
        todoId,
        handleDeleteTodo,
        setTodoListArray,
        inputValue,
    } = Props;
    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleCheckBoxLogic(event, setTodoListArray);
    };

    useEffect(() => {
        const listFromStorage = JSON.parse(
            localStorage.getItem("listsInStorage") || "[]"
        );
        setTodoListArray(listFromStorage);
    }, [setTodoListArray]);

    const obj = {
        setTodoListArray,
        setLayoutVisibility,
        layoutVisibility,
        handleDeleteTodo,
        todoListArray,
    };

    const formProps = {
        layoutVisibility,
        inputValue, handleTodoInput, handleTodoAdd
    }
    const deleteTodoProps = {
        layoutVisibility, handleDeleteTodo
    }

    return (
        <div className="todolist-content-container">
            <h1 className="site-title">My TodoList</h1>
            <TodoForm { ...formProps } />
            <div style={ { height: "450px", overflow: "auto" } }>
                { todoListArray &&
                    todoListArray.map(
                        (
                            todo: { todoText: string; checkbox: boolean | undefined },
                            i: number
                        ) => {
                            const checkbox = todo?.checkbox;
                            const displayTodoProps = { checkbox, handleCheckBox, todo, layoutVisibility }
                            return (
                                <div
                                    className={ layoutVisibility ? "todo-container" : "absko" }
                                    key={ todoId + i }
                                >
                                    <DisplayTodo { ...displayTodoProps } />
                                    <div style={ { display: "flex", alignItems: "center" } }>
                                        <EditTodo { ...obj } />
                                        <DeleteTodo { ...deleteTodoProps } />
                                    </div>
                                </div>
                            );
                        }
                    ) }
            </div>
            <EditModel layoutVisibility={ layoutVisibility } setLayoutVisibility={ setLayoutVisibility } />
        </div>
    );
};
export default List;
