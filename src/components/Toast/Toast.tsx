"use client";

import styles from './Toast.module.css'
import { HiX } from 'react-icons/hi'
import { HiInformationCircle, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi2'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { ToastObj } from '@/types/ToastObj';

type ToastProps =  ToastObj & React.ComponentProps<'div'>

const objIcones = {

    success: HiCheckCircle,
    error: HiExclamationCircle,
    info:HiInformationCircle,

}

const esconderToast = (state:boolean,method:Dispatch<SetStateAction<boolean>>) => {

    if (!state) return
    method(false)

}

const Toast:React.FC<ToastProps> = ({text, type, ...props}) => {

    const Icone = objIcones[type]
    const [mostrarToast, setMostrarToast] = useState(Boolean(text))

    useEffect(() => {
        
        if (!mostrarToast) return
        const time = setTimeout(() => {

            esconderToast(mostrarToast, setMostrarToast)
            
        }, 5000)
        return () => clearTimeout(time)

    }, [])



    return (

        <>
        { mostrarToast && 
        <div className={styles.toastContent} {...props}>
        <div className={styles.toast}>

            <Icone className={styles[type+'Icon']} size={36}/>
            <p className={styles.textContent}>{text}</p>
            <button className={styles.btnToast} onClick={() => {
                esconderToast(mostrarToast, setMostrarToast)
                }}>
                <HiX size={28}/>     
            </button>

            <div className={`${styles.loadingToast} ${styles[type]}`}></div>
            
        </div>
        </div>
       
        }
        </>
       
    )

}

export default Toast