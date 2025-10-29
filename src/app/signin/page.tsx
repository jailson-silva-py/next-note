import styles from './page.module.css'
import { auth, signIn } from "auth"
import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton/SignInButton";
import { TbBrandDiscord, TbBrandGithub, TbBrandGithubFilled, TbBrandGoogle } from "react-icons/tb";

const SignIn = async () => {

    const session = await auth()
    
    if (session) redirect('/')
    return (
        <div className={styles.signAllContent}>
        <div className={styles.loginContent}>
        <div className={styles.textContent}>

            <h1>Welcome!</h1>
            <p>Sign in to Next Note to continue.</p>

        </div>
        
        <form className={styles.formLogin} action={async () => {
            "use server";
            await signIn("google")

        }}>
            
            <SignInButton Icon={TbBrandGoogle} nameLogin="Google"/>

        </form>
        <form className={styles.formLogin} action={async () => {
            "use server";
            await signIn("github")

        }}>
            
            <SignInButton Icon={TbBrandGithub} nameLogin="Github"/>

        </form>
        <form className={styles.formLogin} action={async () => {
            "use server";
            await signIn("discord")

        }}>
            <SignInButton Icon={TbBrandDiscord} nameLogin="Google"/>

        </form>
        </div>
        </div>
        
    )


}

export default SignIn