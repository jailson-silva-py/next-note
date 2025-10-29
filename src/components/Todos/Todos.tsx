"use client";
import Link from 'next/link'
import styles from './Todos.module.css'
import { HiOutlinePlus, HiOutlinePlusCircle, HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi'
import { FormEvent, Fragment, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import { deleteTodoById, findTodosByText } from '@/actions'
import Paginator from '../Paginator/Paginator'
import { HiEllipsisVertical, HiOutlineArchiveBoxXMark } from 'react-icons/hi2'
import { TodoByText } from '@/types/Todo';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import useCustomParams from '@/hooks/useCustomParams';
import Modal from '../Modal/Modal';
import Toast from '../Toast/Toast';
import { ToastObj } from '@/types/ToastObj';
import Submit from '../Submit/Submit';

interface deleteObj {

    deleteMode:boolean,
    noteIndex: number | null,

}

interface optionsOpen {

    index: null | number;
    open:boolean

}

const handleBtnOptions = (index:number,
    setState:React.Dispatch<React.SetStateAction<optionsOpen>>) => 
        (e:MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()
        setState(prev => ({index, open:!prev.open}))

}

const initialDeleteObj = {deleteMode:false, noteIndex:null}

const Todos = () => {

   
    const { params, router, updateUrl, searchParams } = useCustomParams()

    const [page, setPage] = useState(() => {

        const paginaAtual = parseInt(searchParams.get('page') || '1')
        
        return paginaAtual
    })

    const [notas, setNotas] = useState<TodoByText | null>(null)
    const [pending, setPending] = useState(true)
    const [deleteObj, setDeleteObj] = useState<deleteObj>(initialDeleteObj)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [toastObj, setToastObj] = useState<ToastObj>(
        {text:'', type:'info',key:0})
    
    const [optionsOpen, setOptionsOpen] = useState<optionsOpen>(
        {index:null, open:false})

    useEffect(() => {

        const searchRecovery =  searchParams.get('search') || ''
        const pageRecovery = searchParams.get('page') || '1'
        
        const getData = async () => {

            setPending(true)
            const formData = new FormData()
            formData.append('page', pageRecovery)
            formData.append('searchTodo', 
                decodeURIComponent(searchRecovery))
            const dados = await findTodosByText(formData)
            setNotas(dados)
            setPending(false)
            

        }

        getData()

        

    }, [searchParams.get('page'), 
        searchParams.get('search')])
    
    
    useEffect(() => {


        if (notas && notas.search) {

            params.set('search', notas.search)
            updateUrl()

        }

        if(page) {

            if(page < 1) {

                setPage(1)

            } 
            
            else if (notas?.tamanho && page > notas.tamanho) {

                setPage(notas.tamanho)

            }

            params.set('page', page.toString())
            updateUrl()

        }

    }, [notas?.search, page])


    const handleSearch = (e:FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const search = encodeURIComponent(
            formData.get('searchTodo') as string)
        params.set('search', search)
       updateUrl()
        


    }


    //Página anterior
    const handlePrev = () => {
        
        if(page <= 1) return
        setPage(prev => prev - 1)
    
    }

    //Próxima página
    const handleNext = () => {

        if(!notas?.tamanho) return 
       
        if(page >= notas.tamanho) return 

        setPage(prev => prev + 1)

    }

    const handleClearSearch = (e:MouseEvent) => {

        e.preventDefault();
        params.delete('search')
        updateUrl()

    }

    const handleDeleteNote = (e:FormEvent) => {
        
        e.preventDefault();

        const deleteData = async () => {
            
            const toast = await deleteTodoById(
                deleteObj?.noteIndex as number)

            setToastObj(toast)

        }


        const tarefaDeletada = notas?.tarefas.filter((value) => {

            if(value.id === deleteObj.noteIndex) return false
            return true

        })

        if(tarefaDeletada) {
            
            
            setNotas((prev) => {

                const tarefas = tarefaDeletada
                return {...prev, tarefas} as TodoByText
            })
        }

        

        deleteData()
        setDeleteDialog(false)

    }

    const CancelDeleteNote = () => {

        setDeleteObj({deleteMode:true, noteIndex:null})
        setDeleteDialog(false)

    }

    return (
        <div className={styles.todosContent}>
        
        <form className={styles.formSearch} onSubmit={handleSearch}>

            {/* Valor para controle de página */}
            <input type="hidden" name='page' value={page}/>

            <input type="search" name="searchTodo" key={searchParams.get('search')}
            placeholder="Pesquise" required 
            defaultValue={decodeURIComponent(searchParams.get('search') || '')}
            className={styles.inputSearch}/>
            <div className={styles.contentBtnSubmit}>
                <button type="button" 
                className={styles.btnClearSearch} title="Limpar Pesquisa"
                onClick={handleClearSearch}>

                    <HiOutlineArchiveBoxXMark size={32}
                    className={styles.searchIcon}/>

                </button>

                <button type="submit" title="Pesquisar Tarefa"
                className={styles.btnSubmitSearch}>
               
                {pending && searchParams.get('search') ?
                <LoadingSpinner className={styles.loadingIconSearch}/>
                :
                <HiOutlineSearch size={32} 
                className={styles.searchIcon}/>
                }
            </button>
            </div>

        </form>
        
        {!pending && notas && notas?.tarefas.length > 0? 
        <>
        <div className={styles.btnActionsContent}>

            <button className={styles.btnAction}
            onClick={() => {router.replace('/todos/new')}}>
                
                <HiOutlinePlus size={32}/>
                <span>Criar Nota</span>

            </button>

        </div>
        <ul className={styles.todoList}>

            {notas?.tarefas.map((todo, i) => {

                return (
                <Fragment key={todo.id}>
               
                <Link href={`todos/${todo.id}`} 
                className={styles.linkTodo} style={{animationDelay:`${i*0.2}s`}}>
                <li>
                    <button className={styles.optionsContent}
                    onClick={handleBtnOptions(i, setOptionsOpen)}>
                        <HiEllipsisVertical size={32} className={styles.optionIcon}/>
                    {optionsOpen.open && 
                    optionsOpen.index === i && 
                    <div className={styles.options}>
                        <Link className={styles.optionsItem}
                        href={`/todos/${todo.id}?mode=view`}>
                        Visualizar
                        </Link>
                        <Link href={`/todos/${todo.id}`}className={styles.optionsItem}>
                            Editar
                        </Link>
                        <button className={styles.optionsItem}
                        onClick={ () => {
                        setDeleteObj(prev => {

                            return {...prev, noteIndex:todo.id}


                        })  
                        setDeleteDialog(true)
                        }}>
                            Deletar
                        </button>

                    </div>}
                    </button>
                    <h1 className={styles.todoTitle}>{todo.title}</h1>
                    <p className={styles.todoDescription}>
                        {todo.description}
                    </p>

                </li>
                </Link>
                
                
                
                </Fragment>
                )

                

        })}

        </ul>
        </>
        : !pending && notas?.tarefas.length === 0 ? 
        <p className={styles.textSemNotas}>Não há nehuma nota.</p> :
        <LoadingSpinner/>
        }
       
        <Paginator countPage={notas?.tamanho || 1} page={page} 
        handlePrev={handlePrev}
        handleNext={handleNext}/>

        <Modal valueParam="deletion" objState={{state:deleteDialog, 
        setState:setDeleteDialog}} textTitle='Exclusão de nota'>

            <form onSubmit={handleDeleteNote} 
            onReset={CancelDeleteNote} className={styles.formDelete}>

                <p>Você deseja <strong>excluir permanentemente a nota?</strong>
                Após a exclusão, ela <strong>não poderá ser recuperada.</strong></p>
                <div className={styles.btnSubmitDeleteContent}>

                <Submit type="reset" 
                className={`${styles.deleteCancel}`} 
                text='Cancelar'/>

                <Submit type="submit" 
                className={`${styles.btnSubmitDelete} 
                ${styles.deleteConfirm}`} text='Deletar'/>
                
                </div>

            </form>
        </Modal>
        <Toast key={toastObj.key} text={toastObj.text} type={toastObj.type}/>

        </div>

    )

}

export default Todos