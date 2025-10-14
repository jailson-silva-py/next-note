import { redirect } from "next/navigation"
import NewTodoClient from "./client"
import { auth } from "auth"

const NewTodo = async () => {

    const session = await auth()

    if (!session) redirect('/signin')

    return <NewTodoClient/>

}

export default NewTodo