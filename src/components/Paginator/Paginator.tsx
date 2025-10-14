import styles from './Paginator.module.css'

interface PaginatorProps {

    page:number,
    countPage:number,
    handlePrev:React.MouseEventHandler,
    handleNext:React.MouseEventHandler

}

const Paginator:React.FC<PaginatorProps> = (
    {page, countPage, handlePrev, handleNext}) => {
    
    return (

    <div className={styles.paginator}>
    <button onClick={handlePrev} type="submit" 
    className={styles.btnPaginator}>
        Anterior
    </button>
    
    <p>Página {page || 1} de {countPage || 1}</p>
 
    <button onClick={handleNext} type="submit" 
    className={styles.btnPaginator}>
        Próxima
    </button>               
 
    </div>

    )

}

export default Paginator