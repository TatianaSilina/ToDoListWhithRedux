import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootStateType} from "./state/store";

import {addTaskAC, addTaskTC, changeStatusAC, changeTitleAC, fetchTasksTC, removeTaskAC} from "./state/TaskReducer";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC, changeTodoListTitleTC, deleteTodolistTC,
    FilterValuesType,
    removeTodoListAC
} from "./state/TodoListsReducer";
import {Task} from "./components/Task";
import {TaskType} from "./api/tasks-api";
import {TaskStatuses} from "./api/todolist-api";


export type TodolistPropsType = {
    todoListId: string,
    title: string,
    filter: FilterValuesType,

}

const TodolistWithRedux = React.memo((props: TodolistPropsType) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListId))
    },[])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todoListId, title))
    }, [dispatch])


    const onClickAll = useCallback((value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(value, props.todoListId))
    }, [dispatch])

    const onClickRemoveTodoList = () => {
        dispatch(deleteTodolistTC(props.todoListId))
    }
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleTC(title, props.todoListId))

    }, [dispatch])

    if (props.filter === 'Active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <DeleteForeverIcon/>
                </IconButton>
                {/*<Button callBack={onClickRemoveTodoList} name={'Х'}/>*/}
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks && tasks.map((t, index) => <Task key={t.id} removeTask={removeTaskAC} task={t} changeTitle={changeTitleAC}
                                         todoListId={props.todoListId} changeStatus={changeStatusAC}/>)
                }
            </div>
            <div>
                <ButtonGroup
                    disableElevation
                    size={'small'}
                >
                    <Button
                        variant={props.filter === 'All' ? 'outlined' : 'contained'}
                        color={props.filter === 'All' ? 'secondary' : 'primary'}
                        onClick={() => onClickAll('All')}>All</Button>
                    <Button
                        variant={props.filter === 'Active' ? 'outlined' : 'contained'}
                        color={props.filter === 'Active' ? 'secondary' : 'primary'}
                        onClick={() => onClickAll('Active')}>Active</Button>
                    <Button
                        variant={props.filter === 'Completed' ? 'outlined' : 'contained'}
                        color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                        onClick={() => onClickAll('Completed')}>Completed</Button>
                    {/*<Button filter={props.filter} name={'All'} callBack={() => onClickAll('All')}/>*/}
                    {/*<Button filter={props.filter} name={'Active'} callBack={() => onClickAll('Active')}/>
                <Button filter={props.filter} name={'Completed'} callBack={() => onClickAll('Completed')}/>*/}
                </ButtonGroup>
            </div>
        </div>

    )
})




export default TodolistWithRedux;