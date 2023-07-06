import React, {Reducer, useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import Container from '@material-ui/core/Container';
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    addTodoListAC, addTodolistTC, fetchTodolistTC, setTodolistsAC, TodolistDomainType,

} from "./state/TodoListsReducer";

import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootStateType} from "./state/store";
import TodolistWithRedux from "./TodolistWithRedux";
import {todolistAPI} from "./api/todolist-api";
import {TaskType} from "./api/tasks-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {

    console.log('app')
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]> (state => state.todolists)


    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
       dispatch(fetchTodolistTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        let action = addTodolistTC(title)
        dispatch(action)
    }, [dispatch]);

    const todolistComponents = todoLists.map((tl) => {

        return (
            <Grid key={tl.id} item>
                <Paper style = {{padding: '30px'}}  elevation={3}>
                    <TodolistWithRedux
                        title={tl.title}
                        filter={tl.filter}
                        todoListId={tl.id}

                    />
                </Paper>

            </Grid>

        )
    })

    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed >
                <Grid container spacing={3} style = {{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} >
                    {todolistComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
