"use client";
import { createTodo } from "@/actions"
import Form from "@/components/Form/Form"
import FormField from "@/components/FormField/FormField"
import Submit from "@/components/Submit/Submit"
import Toast from "@/components/Toast/Toast"
import { ToastObj } from "@/types/ToastObj";
import { useActionState } from "react";

const NewTodoClient = () => {

   
    const [state, action, pending] = useActionState(createTodo, {text:'', type:'error', key:0} as ToastObj)


    return (
        <>
        <div className="content">
        <h1>Crie sua Tarefa</h1>
        <Form action={action}>

            <FormField textArea={false} name="titleTodo" titleField="Titulo"
            placeholder="Título da tarefa..."/>
            <FormField name="descriptionTodo" textArea={true}
            placeholder="Descreva a tarefa..."
            titleField="Descrição"/>
            <Submit text={pending ? 'Criando...':'Criar'}/>

        </Form>
        </div>
        
        <Toast text={state.text} type={state.type} 
        key={state.key}/>

        </>
    )

}

export default NewTodoClient