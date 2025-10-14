import Link from 'next/link';
import styles from './page.module.css'

export default async function Home() {
  
  return (
    <div className={styles.page}>
      <div className={styles.homeTextContent}>
      <h1 className={styles.welcomeTitle}>Bem vindo ao app 
        <span className={styles.nameApp1}> Next</span>
        <span className={styles.nameApp2}>Note</span>
      </h1>
      <p className={styles.introductionText}>
        Organize suas notas com o máximo de velocidade e praticidade.
        Beneficie-se da lógica client-server side do Next.js!
      </p>
      </div>
      <Link href='/todos?page=1' className={styles.linkCreate}>
      Crie uma tarefa
      </Link>
     
    </div>
  );
}
