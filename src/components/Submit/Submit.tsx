import styles from './Submit.module.css'

type SubmitProps = {

    text:string

} & React.ComponentProps<'button'>

const Submit:React.FC<SubmitProps> = ({text, ...props}) => {

    return (

        <button type="submit" className={styles.btnSubmit} {...props}>
            {text}
        </button>

    )

}

export default Submit