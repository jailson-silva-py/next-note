"use client";
import { HiX } from "react-icons/hi";
import styles from "./Modal.module.css"
import useCustomParams from "@/hooks/useCustomParams";
import {  useEffect } from "react";

type ModalProps = {

    children: React.ReactNode
    textTitle:string;
    objState:{state: boolean, setState:React.Dispatch<React.SetStateAction<boolean>>}
    valueParam:string
} 


const Modal:React.FC<ModalProps> = ({children, textTitle, objState, valueParam}) => {

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
                    <HiX size={28}/>
                    </button>

                </div>
                
                {children}

            </dialog>
            </div>
        }
        </>

    )

}

export default Modal