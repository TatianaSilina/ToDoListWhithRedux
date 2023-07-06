import {useDispatch} from "react-redux";
import {changeStatusAC, changeTitleAC, removeTaskTC, updateTaskStatusTC} from "../state/TaskReducer";
import React, {ChangeEvent, useCallback} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../api/tasks-api";
import {TaskStatuses} from "../api/todolist-api";
import {AppDispatchType} from "../state/store";


type TaskPropsType = {
    removeTask: (taskId: string, todoListId: string) => void,
    changeStatus: (id: string, eventStatus: TaskStatuses, todoListId: string) => void,
    changeTitle: (taskId: string, title: string, todoListId: string) => void,
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch<AppDispatchType>()

    const removeTaskHandler =  () => dispatch(removeTaskTC(props.task.id, props.todoListId))
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked

        dispatch(updateTaskStatusTC(props.task.id, {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}, props.todoListId))
    }
    const changeTitle = useCallback((title: string) => dispatch(updateTaskStatusTC(props.task.id, {title}, props.todoListId)), [dispatch, props.task.id, props.todoListId])
    return (
        <div className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <IconButton onClick={removeTaskHandler}>
                <DeleteForeverIcon/>
            </IconButton>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={changeStatusHandler}/>

            <EditableSpan title={props.task.title} changeTitle={changeTitle}/>
        </div>)
})