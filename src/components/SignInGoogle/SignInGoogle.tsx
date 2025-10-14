import styles from './SignInGoogle.module.css'
import { FaGoogle } from 'react-icons/fa'

const SignInGoogle = () => {

    return (

        <button type="submit" className={styles.btnGoogle}>

        <FaGoogle className={styles.googleIcon}/>
        <span>Sign In With Google</span>

        </button>

    )

}

export default SignInGoogle