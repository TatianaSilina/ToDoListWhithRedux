import {instance, TaskPriorities, TaskStatuses} from "./todolist-api";

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}


type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ResponseTaskType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<string>
    data: T
}



export const TaskAPI = {

    getTask(todolistId: string){
        const promise = instance.get<GetTasksResponse>(
            `/todo-lists/${todolistId}/tasks`
        )
        return promise
    },

    createTask(todolistId: string, title: string){
        const promise = instance.post<ResponseTaskType<{item: TaskType}>>(
            `/todo-lists/${todolistId}/tasks`, {title: title}
        )
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseTaskType<{item: TaskType}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,

        )
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<ResponseTaskType<UpdateTaskModelType>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`, model
        )
        return promise
    }
}

