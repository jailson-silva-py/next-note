import styles from './LoadingSpinner.module.css'
import { TbLoader3} from "react-icons/tb"

const LoadingSpinner = (props:React.ComponentProps<'div'>) => {

    return (

        <div className={styles.loadingNotas} {...props}
        role="loading-spinner">

            <TbLoader3 role="icon" pathLength={50}
            className={styles.iconLoading}/>

        </div>

    )

}

export default LoadingSpinner