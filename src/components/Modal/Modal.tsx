"use client";
import { HiOutlineX, HiX } from "react-icons/hi";
import styles from "./Modal.module.css"
import useCustomParams from "@/hooks/useCustomParams";
import {  useEffect } from "react";
import Toast from "../Toast/Toast";
import { ToastObj } from "@/types/ToastObj";

type ModalProps = {

    children: React.ReactNode
    textTitle:string;
    objState:{state: boolean, setState:React.Dispatch<React.SetStateAction<boolean>>}
    toast?:ToastObj;
    valueParam:string
} 

const Modal:React.FC<ModalProps> = ({children, 
    toast, textTitle, objState, valueParam}) => {

    const { params, searchParams, updateUrl } = useCustomParams()
    const handleCloseBtn = () => {

        objState.setState(false)
        params.delete('modal')
        updateUrl()

    }

    useEffect(() => {

        const modal = searchParams.get('modal') === valueParam

        const handleEscExitModal = (e:KeyboardEvent) => {

            if (e.key === 'Escape') {

                handleCloseBtn()

            }

        }

        if(!modal) {

            objState.setState(false)
            return
            
        }

        
        objState.setState(true)
        document.addEventListener('keydown', handleEscExitModal)

        return () => document.removeEventListener(
            'keydown', handleEscExitModal)

    }, [searchParams.get('modal')])

    return (
        <>
        {objState.state && 
            <div className={styles.fixedBgModal}>
            <dialog className={styles.modal} aria-modal='true'>

                <div className={styles.modalHeader}>

                    <h1 className={styles.modalTitle}>{textTitle}</h1>
                    <button className={styles.btnClose} onClick={handleCloseBtn}>
                    <HiOutlineX size={28}/>
                    </button>

                </div>
                
                {children}

            </dialog>
            </div>
        }
        {toast && <Toast text={toast.text}
        type={toast.type} key={toast.key}/>}
        </>

    )

}

export default Modal