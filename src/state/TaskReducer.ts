import {addTodoListACType, removeTodoListACType, SetTodolistsActionType} from "./TodoListsReducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskAPI, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "./store";


export type ActionsType =
    removeTaskACType
    | addTaskACType
    | changeStatusACType
    | changeTitleACType
    | addTodoListACType
    | removeTodoListACType
    | SetTodolistsActionType
    | SetTasksActionType
    | updateTaskACType

const initialState: TasksStateType = {}

export const tasksReducer = (state:TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id !== action.payload.taskId)
            }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.task.todoListId];
            const newTasks = [action.payload.task, ...tasks];
            stateCopy[action.payload.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-STATUS':{
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    status: action.payload.eventStatus
                } : el)
            }
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }


        case 'CHANGE-TITLE':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskID ? {...el, title:action.payload.title} : el)
            }

        case 'ADD-TODOLIST':
            return {...state,  [action.payload.newTodolist.id] : []}

        case 'REMOVE-TODOLIST':
            const copy = {...state}
            delete copy[action.payload.todoListId]
            return   copy

        case 'SET-TASKS': {

            const {todolistId, tasks} = action.payload

            return {...state, [todolistId]: tasks}
        }

        default:
            return state
    }
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todoListId
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>


export const addTaskAC = (todoListId: string, task: TaskType)  => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            task

        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (taskID: string, eventStatus: TaskStatuses, todoListId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            taskID,
            eventStatus,
            todoListId
        }
    } as const
}

type changeTitleACType = ReturnType<typeof changeTitleAC>
export const changeTitleAC = (taskID: string, title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            taskID,
            title,
            todoListId
        }
    } as const
}

export type SetTasksActionType = ReturnType<typeof SetTasksAC>

export const SetTasksAC= (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    TaskAPI.getTask(todoListId)
        .then((res) => {
            dispatch(SetTasksAC(todoListId, res.data.items))
        })
}

export const removeTaskTC = (taskID: string,todoListId: string) => (dispatch: Dispatch) => {
    TaskAPI.deleteTask(todoListId, taskID)
        .then((res) => {
            dispatch(removeTaskAC(taskID, todoListId))
        })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    TaskAPI.createTask(todoListId, title)
        .then((res) => {
            dispatch(addTaskAC(todoListId, res.data.data.item))
        })
}

export const updateTaskStatusTC = (taskId: string, model: UpdateTaskModelType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todoListId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })


        if (task) {
            TaskAPI.updateTask(todoListId, taskId, {
               ...task, ...model
            }).then(() => {
                const action = updateTaskAC(taskId, model, todoListId)
                dispatch(action)
            })
        }
    }
}
