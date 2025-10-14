import styles from './SignInGithub.module.css'
import { SiGithub } from 'react-icons/si'

const SignInGithub = () => {

    return (

        <button type="submit" className={styles.btnGithub}>

        <SiGithub className={styles.githubIcon}/>
        <span>Sign In With GitHub</span>

        </button>

    )

}

export default SignInGithub