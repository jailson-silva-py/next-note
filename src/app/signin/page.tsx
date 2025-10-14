import SignInGoogle from "@/components/SignInGoogle/SignInGoogle";
import styles from './page.module.css'
import { auth, signIn } from "auth"
import { redirect } from "next/navigation";
import SignInGithub from "@/components/SignInGitHub/SignInGithub";
import SignInDiscord from "@/components/SignInDiscord/SignInDiscord";

const SignIn = async () => {

    const session = await auth()
    
    if (session) redirect('/')
    return (

        <div className={styles.loginContent}>
        <div className={styles.textContent}>
        <h1>Cadastre-se ou faça Login com sua conta Google...  </h1>
        </div>
        <form className={styles.formLogin} action={async () => {
            "use server";
            await signIn("google")

        }}>
            
            <SignInGoogle/>

        </form>
        <form className={styles.formLogin} action={async () => {
            "use server";
            await signIn("github")

        }}>
            
            <SignInGithub/>

        </form>
        <form className={styles.formLogin} action={async () => {
            "use server";
            await signIn("discord")

        }}>
            
            <SignInDiscord/>

        </form>
        </div>

    )


}

export default SignIn