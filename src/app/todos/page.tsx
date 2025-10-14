import Todos from "@/components/Todos/Todos"
import { auth } from "auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const TodosPage =  async () => {

   const session = await auth()

   if (!session) redirect('/signin')
    return (

        <Suspense> 

            <Todos/>           

        </Suspense>

        )

}

export default TodosPage