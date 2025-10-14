import { LiaSpinnerSolid } from "react-icons/lia"
import styles from './LoadingSpinner.module.css'

const LoadingSpinner = () => {

    return (

        <div className={styles.loadingNotas}
        role="loading-spinner">

            <LiaSpinnerSolid role="icon" 
            className={styles.iconLoading}/>

        </div>

    )

}

export default LoadingSpinner