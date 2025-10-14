"use client";
import { updateTodoById } from "@/actions"
import Form from "@/components/Form/Form"
import FormField from "@/components/FormField/FormField"
import Submit from "@/components/Submit/Submit"
import Toast from "@/components/Toast/Toast"
import { ToastObj } from "@/types/ToastObj"
import { Todo } from "@/types/Todo"
import { MouseEvent, useActionState, useCallback, useState } from "react";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import styles from './page.module.css'


export const TodoPageClient =  ({todo, id}:{todo:Todo, id:string}) => {

    const [editable, setEditable] = useState(true)
    const [viewMode, setViewMode] = useState(false)

    const handleAction = async (formState:ToastObj, formData:FormData) => {

        const title = formData.get('titleTodo')
        const description = formData.get('descriptionTodo')

        if (title === todo.title && 
            description === todo.description) {

            return {text:'Os campos continuam iguais!', 
                type:'info', key:Date.now()} as ToastObj

        }

        const toast = await updateTodoById(formState, formData)

        return toast

    }

    const [state, action, pending] = useActionState(handleAction, 
        {text:'', type:'info', key:0} as ToastObj)

    const handleBtnEdit = (e:MouseEvent) => {

        e.preventDefault()
        setEditable(prev => !prev)

    }

    const handleBtnViewMode = (e:MouseEvent) => {

        e.preventDefault()
        setViewMode(prev => !prev)

    }

    const BtnEditViewContent = useCallback(() => {

        return (

            <div className={styles.btnContent}>
            <button onClick={handleBtnEdit} 
            title="Desabilitar / Habilitar edição de nota"
            className={styles.btn}>
                {
                editable ? 
                <HiOutlinePencil className={styles.penIcon}/> :
                <div className={styles.iconEditContent}>
                <HiOutlinePencil className={styles.penIcon}/>
                </div>
                }
            </button>
            <button onClick={handleBtnViewMode} 
            title="Ativar / Desativar modo visualização"
            className={styles.btn}>
                {
                viewMode ? 
                <HiOutlineEye/> : 
                <HiOutlineEyeOff/>
                }
            </button>
            </div>

        )

    }, [editable, viewMode])


    return (
        <>
        
        <div className="content">
        { !viewMode ? 
        //viewMode === true
        <>  
        <h1 className={styles.titleForm}>{editable ? 'Edite' : 'Veja' } sua Nota</h1>
        <Form action={action}>
            <BtnEditViewContent/>
            <FormField textArea={false} name="titleTodo" titleField="Titulo"
            placeholder="Título da tarefa..." defaultValue={todo.title}
            disabled={!editable}/>
            <FormField name="descriptionTodo" textArea={true}
            placeholder="Descreva a tarefa..."
            defaultValue={todo.description}
            titleField="Descrição" disabled={!editable}/>
            <input type="hidden" value={id} name='TodoId'/>
            <Submit text={pending ? 'Salvando...':'Salvar'} 
            disabled={!editable}/>

        </Form>
        </> 
        // caso viewMode === false
        : 
        <div className={styles.viewModeContent}>

            <BtnEditViewContent/>

            <h1 className={styles.titleTodoView}>{todo.title}</h1>
            <p className={styles.descriptionTodoView}>
                {todo.description}
            </p>
        
        </div>
        }

        </div>
        
        <Toast text={state.text} type={state.type} 
        key={state.key}/>
        </>
        )

}