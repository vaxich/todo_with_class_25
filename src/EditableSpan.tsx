import { ChangeEvent, useState } from 'react';
import './App.css';

type EditableSpanPropsType = {
    title: string
    onClick: (title: string) => void
    isDone?: boolean
}



export const EditableSpan = (props: EditableSpanPropsType) => {

    const { title, isDone, onClick } = props

    const [edit, setEdit] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState(title);

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTask()
        }
    }

    const onChangeSetNewTitle = (el: ChangeEvent<HTMLInputElement>) => {
        //inputError && setinputError(false)
        setNewTitle(el.target.value)
    }

    const addTask = () => {
        onClick(newTitle)
    }

    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeSetNewTitle}></input>
            : <span onDoubleClick={editHandler} className={isDone ? "task_done" : "task"} >{title}</span>

    )

}