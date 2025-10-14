import styles from './Form.module.css'

type FormProps = {

    children:React.ReactNode,

} & React.ComponentProps<'form'>

const Form:React.FC<FormProps> = ({children, ...props}) => {

    return (

        <form className={styles.form} {...props} role="form">

            {children}

        </form>

    )

}

export default Form