import { findTodoById } from "@/actions"
import { redirect } from "next/navigation"
import { TodoPageClient } from "./client"

interface TodoPage {

    params: Promise<{id:string}>

}

const TodoPage =  async ({params}:TodoPage) => {
 
    const { id } = await params
    const todo = await findTodoById(parseInt(id))


    if (!todo) redirect('/todos')

    
    return <TodoPageClient todo={todo} id={id}/>

}

export default TodoPage