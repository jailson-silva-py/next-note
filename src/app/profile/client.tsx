"use client";
import styles from "./page.module.css"
import Image from "next/image"
import Submit from "@/components/Submit/Submit"
import { HiOutlineArrowUpOnSquare } from "react-icons/hi2"
import {ChangeEvent, FormEvent, useState, useTransition } from "react"
import { User } from "@prisma/client";
import Toast from "@/components/Toast/Toast";
import { ToastObj } from "@/types/ToastObj";
import { updateUserById } from "@/actions";



interface Iprops {

    user:User

}

const ProfileClientPage = ({user}:Iprops) => {

    
    
    const [file, setFile] = useState<File | null>(null)
    const [fileURL, setFileUrl] = useState<string | null>(null)
    const [toast, setToast] = useState<ToastObj>({
        text:'',
        type:'info',
        key:0
    })

    const [pending, setPending] = useState(false)

    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {

        const fileData = e.target.files?.[0]
        


        if (fileData) {

            setFile(fileData)
            const reader = new FileReader()

            reader.onload = (e) => {

                setFileUrl(e.target?.result as string)

            }

            reader.onerror = () => {

                console.error('Erro ao carregar a imagem')

            }

            reader.readAsDataURL(fileData)

        }

    }

    const submitForm =  (e:FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        if (file && file?.size > 5 * 1024 * 1024) {

            setToast({
            text:'A imagem não pode ter mais de 5MB!',
            type:'info',
            key:Date.now()})
            return

        }

        if (formData.get('username') === user.name && !file) {

            setToast({
            text:'Nada foi alterado!',
            type:'info',
            key:Date.now()})
            return

        }
        (async () => {

            setPending(true)
            const toastObj = await updateUserById(formData)
            setPending(false)
            setToast(toastObj)
            setFile(null)

        })()
       
    }
    
    const resetForm = (e:FormEvent) => {

        setFile(null)
        setFileUrl(null)

    }

    return (
    <>
    <form onSubmit={submitForm} className={styles.formProfile}
    onReset={resetForm}>

            <h1>Perfil do usuário</h1>
            <Image src={ user.image || '/no-image-profile.jpg'} 
            width={150} height={150} alt="userImage"
            className={styles.imgProfile} priority/>
            

            <div className={styles.formRow}>
            <label htmlFor="username">
                Nome do usuário:
            </label>

            <input type="text" name="username" id="username"
            defaultValue={user?.name || ''} 
            className={styles.input}/>
            </div>

            <div className={styles.formRow}>

            <label htmlFor="imageInput">Escolha uma Imagem</label>
            <div className={styles.inputFileContent}>

            <input type="file" accept="image/*" 
            name="imageInput" id="imageInput" 
            className={styles.inputFile} 
            onChange={handleFileChange}/>

            {!file ? 
            <div className={styles.inputFileText}>

                <HiOutlineArrowUpOnSquare size={32}/>
                <p>Clique ou arraste uma imagem aqui</p>

            </div>
            :
            <div className={`${styles.inputFileText} 
            ${styles.imageSelectedContent}`}>

                
               {fileURL && <Image src={fileURL}  width={50} height={50} 
                alt="fileImage" className={styles.imageFileInput}/>}
                <p>{file.name}</p>

            </div>
            }   

            </div>

            </div>

            <div className={styles.btnsSubmitContent}>

            <Submit text="Resetar" type="reset" style={{background:'var(--red)'}}/>
            <Submit text={pending?'Salvando...':'Salvar'}/>

            </div>
            

        </form>
        <Toast key={toast.key} text={toast.text} type={toast.type}/>
        </>
    )
}

export default ProfileClientPage