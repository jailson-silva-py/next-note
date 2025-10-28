"use client";
import Link from 'next/link'
import styles from './Todos.module.css'
import { HiOutlinePlusCircle, HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi'
import { FormEvent, Fragment, MouseEvent, useEffect, useState } from 'react'
import { deleteTodoById, findTodosByText } from '@/actions'
import Paginator from '../Paginator/Paginator'
import { FaSpinner } from 'react-icons/fa'
import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2'
import { TodoByText } from '@/types/Todo';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import useCustomParams from '@/hooks/useCustomParams';
import Modal from '../Modal/Modal';
import Toast from '../Toast/Toast';
import { ToastObj } from '@/types/ToastObj';
import { ImSpinner10 } from 'react-icons/im';

interface deleteObj {

    deleteMode:boolean,
    noteIndex: number | null,

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
        <div className={styles.btnActionsContent}>

            <button className={styles.btnAction}
            onClick={() => {router.replace('/todos/new')}}>

                <HiOutlinePlusCircle size={32}/>

            </button>
            
            <button className={`${styles.btnAction}
            ${deleteObj.deleteMode ? styles.deleteMode:''}`} 
            onClick={() => setDeleteObj(prev => ({...prev, deleteMode:!prev.deleteMode}))}>

                <HiOutlineTrash size={32}/>

            </button>

        </div>
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
                <ImSpinner10 size={24} 
                className={`${styles.searchIcon} 
                ${styles.loadingIconSearch}`}/>
                :
                <HiOutlineSearch size={32} 
                className={styles.searchIcon}/>
                }
            </button>
            </div>

        </form>
        
        {!pending && notas && notas?.tarefas.length > 0? 
        
        <ul className={styles.todoList}>

            {notas?.tarefas.map((todo) => {

                return (
                <Fragment key={todo.id}>
                {!deleteObj.deleteMode ? 

                //Caso deleteMode for false retorne um Link
                <Link href={`todos/${todo.id}`} 
                className={styles.linkTodo}>
                <li>
                    
                    <h1 className={styles.todoTitle}>{todo.title}</h1>
                    <p className={styles.todoDescription}>
                        {todo.description}
                    </p>

                </li>
                </Link>

                :
                // Caso deleteMode for true retorne um li normal 
                // com onClick
                
                <div className={styles.linkTodo}>
                <li className={styles.deletion} onClick={ () => {
                    setDeleteObj(prev => {

                        return {...prev, noteIndex:todo.id}


                    })  
                    setDeleteDialog(true)
                }}>
                    
                    <h1 className={styles.todoTitle}>{todo.title}</h1>
                    <p className={styles.todoDescription}>
                        {todo.description}
                    </p>

                </li>
                </div>
                
                
                }
                </Fragment>
                )

                

        })}

        </ul>
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

                <button type="reset" 
                className={`${styles.btnSubmitDelete} 
                ${styles.deleteCancel}`}>
                    Não
                </button>

                <button type="submit" 
                className={`${styles.btnSubmitDelete} 
                ${styles.deleteConfirm}`}>
                Sim
                </button>
                
                </div>

            </form>
        </Modal>
        <Toast key={toastObj.key} text={toastObj.text} type={toastObj.type}/>

        </div>

    )

}

export default Todos