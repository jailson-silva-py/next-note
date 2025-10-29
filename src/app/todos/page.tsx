import Todos from "@/components/Todos/Todos"
import { auth } from "auth";
import { redirect } from "next/navigation";

const TodosPage =  async () => {

   const session = await auth()

   if (!session) redirect('/signin')
    return (

        <Todos/>           


        )

}

export default TodosPage