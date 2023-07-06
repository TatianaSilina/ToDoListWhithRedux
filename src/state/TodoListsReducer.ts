
import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: TodolistDomainType[] = initialState, action: tsarType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter((tl) => tl.id !== action.payload.todoListId)
        }
        case "ADD-TODOLIST":{
            return [{...action.payload.newTodolist, filter: 'All'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => tl.id === action.payload.todolistId ? {...tl, title:action.payload.newTodolistTitle} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            /*setTodoList(todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: value} : tl))*/
            return state.map((tl) => tl.id === action.payload.todolistId2 ? {...tl, filter: action.payload.newFilter} : tl)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'All'
            }))
        }
        default: return state
    }
}
export type tsarType = removeTodoListACType | addTodoListACType | changeTodoListTitleAC | changeTodoListFilterACType | SetTodolistsActionType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (todoListId:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            todoListId
        }

    } as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (newTodolist: TodolistType ) =>{
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolist
        }

    }as const
}
type changeTodoListTitleAC = ReturnType<typeof changeTodoListTitleAC>

export const changeTodoListTitleAC = (newTodolistTitle: string, todolistId:string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newTodolistTitle,
            todolistId
        }
    }as const
}


type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (newFilter: FilterValuesType, todolistId2: string) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    }as const
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTotdolist(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodoListAC(todolistId))
        })
}

export const changeTodoListTitleTC = (title: string, id: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(title, id)
        .then((res) => {
            dispatch(changeTodoListTitleAC(title, id))
        })
}