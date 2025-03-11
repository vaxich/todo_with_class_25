import { error } from "console"
import { ChangeEvent, useState, KeyboardEvent } from "react";


type AddItemFormPropsType = {    
    onClick: ( newTitle: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {

    const {  onClick } = props

    const [inputValue, setInputValue] = useState("");
    const [inputError, setinputError] = useState(false);

    const isAddBtnDisabled = !inputValue || inputValue.length > 15;

    const messageForUser = inputError
        ? <span style={{ color: "red" }}>наименование не может быть пустым</span>
        : inputValue.length <= 15
            ? <span>введите новыю таску</span>
            : <span style={{ color: "red" }}>максимум 15 символов</span>

    const addTaskOnClick = () => {
        const trimmedTitle = inputValue.trim()
        if (trimmedTitle) {
            onClick( trimmedTitle)
        } else {
            setinputError(true)
        }

        setInputValue("")
    }

    const onChangeSetNewTitle = (el: ChangeEvent<HTMLInputElement>) => {
        inputError && setinputError(false)
        setInputValue(el.target.value)
    }

    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && addTaskOnClick()
    }

    return (
        <div>
            <input
                value={inputValue}
                onChange={onChangeSetNewTitle}
                onKeyDown={onKeyDownAddTask}
                className={inputError ? "input_error" : ""}
            />
            <button
                disabled={isAddBtnDisabled}
                onClick={() => {
                    addTaskOnClick()

                }}>+</button> 
            <div>
                {messageForUser}
            </div>
            {inputError && <div className="erroe-message">{inputError}</div>}
        </div>
    )
}