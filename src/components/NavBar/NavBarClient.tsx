"use client";
import Link from 'next/link';
import styles from './NavBar.module.css'
import { useState } from 'react'
import { HiOutlineAdjustments, HiOutlineChatAlt, HiOutlineDocumentDuplicate, HiOutlineHome, HiOutlineLogout, HiOutlineSparkles} from 'react-icons/hi'
import Image from 'next/image';
import { HiArrowLeftOnRectangle, HiOutlineChatBubbleLeft, HiOutlineDocumentPlus, HiOutlineHeart, HiOutlinePencilSquare } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';
import Modal from '../Modal/Modal';
import useCustomParams from '@/hooks/useCustomParams';
import FormPreferences from '../FormPreferences/FormPreferences';
import { User } from '@prisma/client'
import BtnChangeTheme from '../BtnChangeTheme/BtnChangeTheme';
import { BsChatHeart } from 'react-icons/bs';
import { FaLightbulb } from 'react-icons/fa';

const formatNome = (name:any) => {
    if (typeof name !== 'string') return
    return name.slice(0, 11).trim()

}

interface Iprops {

    user:User | null,

}

const NavBarClient = ({user}:Iprops) => {
   
    const [isOpen, setIsOpen] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [openPreferences, setOpenPreferences] = useState(false)
    const {updateUrl, params} = useCustomParams()
    const classLinhasContent = `${isOpen ? styles.closeContent : styles.linhasContent}`
    const classesDropdown = `${styles.dropdown} ${isOpen ? styles.visible : styles.invisible}`
    
    return (
        <>
        <nav className={styles.nav}>
        
            
            <ul className={styles.navList}>
                <li>

                    <div className={classLinhasContent} 
                    onClick={() => setIsOpen(!isOpen)}>

                    <div className={styles.linha1}></div>
                    <div className={styles.linha2}></div>
                    <div className={styles.linha3}></div>

                    </div>  

                </li>
                <li>

                    <ul className={classesDropdown}>

                        <li title="Página Inicial" className={styles.listItem}>
                            <Link href='/'>
                            <HiOutlineHome  className={styles.icon}/>
                            </Link>
                        </li>

                        <li title="Ver Notas" className={styles.listItem}>
                            <Link href='/todos?page=1'>
                            <HiOutlineDocumentDuplicate  className={styles.icon}/>
                            </Link>
                        </li>

                        <li title="Nova Nota" className={styles.listItem}>
                            <Link href='/todos/new'>
                            <HiOutlineDocumentPlus  className={styles.icon}/>
                            </Link>
                        </li>

                        <li title="Resumo com IA" className={styles.listItem}>
                            <Link href='/ia'>
                            <HiOutlineSparkles  className={styles.icon}/>
                            </Link>
                        </li>

                        <li title="Mudar Tema" className={styles.listItem}>
            
                           <BtnChangeTheme/>
                           
                        </li>
                        

                    </ul>

                </li>    

            </ul>

            <Link href="/" className={styles.nameAppContent}>
                <span className={styles.degrade1}>Next</span>
                <span className={styles.degrade2}>Note</span>
            </Link>

      
           { !user ? 
           <Link className={styles.signIn} href='/signin'>
            <HiArrowLeftOnRectangle size={32}/>
            <span>Entrar</span>
           </Link>
           :
           <div className={styles.profileContent} 
           onClick={() => setOpenProfile(!openProfile)} title="Abrir modal">

                <Image src={user?.image || 'no-image-profile.jpg'} 
                width={50} height={50} 
                alt={'Foto de'+user?.name} 
                loading='eager' priority/>
                <div className={styles.profileName} 
                title={user?.name || 'Nome usuário'}>{
                    formatNome(user?.name)
                }</div>

                {openProfile && 
                
                <ul className={styles.dropdownProfile} aria-label="modal-profile">

                    <Link href='/profile'>
                    <li title="Edite suas informações">

                        <HiOutlinePencilSquare size={24}/>
                        <span>Editar</span>
                    </li>
                    </Link>


                    <li title="Personalize o site" onClick={() => {

                        params.set('modal', 'preferences')
                        updateUrl()

                    }}>

                        <HiOutlineAdjustments size={24}/>
                        <span>Preferências</span>

                    </li>

                    <li title="Sair desta conta" onClick={() => signOut()}>

                        <HiOutlineLogout size={24}/>
                        <span>Log out</span>

                    </li>

                </ul>
                
                }
                
            </div>}
           

        </nav>

       

        <Modal valueParam="preferences" objState={
            {state:openPreferences, setState:setOpenPreferences}
        } textTitle="Preferências">

            <FormPreferences/>
            

        </Modal>

        
        </>

    )

}

export default NavBarClient