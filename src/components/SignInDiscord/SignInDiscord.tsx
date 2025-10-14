import styles from './SignInDiscord.module.css'
import { FaDiscord } from 'react-icons/fa'

const SignInDiscord = () => {

    return (

        <button type="submit" className={styles.btnDiscord}>

        <FaDiscord className={styles.dicordIcon}/>
        <span>Sign In With Discord</span>

        </button>

    )

}

export default SignInDiscord