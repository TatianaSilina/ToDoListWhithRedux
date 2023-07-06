import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',

}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd2988559-a92a-4b37-86fd-6618afe90899'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.getTodolists().then((response)=>{
               setState(response.data);
           })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
/*export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.createTodolist("WORK").then((res)=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}*/
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ef79a948-0061-43d0-a233-8d63c3130cdb'
        todolistAPI.deleteTodolist(todolistId)
            .then((res)=> {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '93a3ea3b-272e-4660-9a8a-ff5fd7535413'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
