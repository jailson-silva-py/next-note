import { IconType } from 'react-icons'
import styles  from './SignInButton.module.css'
interface Iprops {

    nameLogin:string,
    Icon:IconType

}

const SignInButton = ({nameLogin, Icon}:Iprops) => {
    
    return (

        <button type="submit" className={styles.btnSignIn}>

        <Icon className={styles.icon}/>
        <span>Sign In With {nameLogin}</span>

        </button>

    )

}

export default SignInButton