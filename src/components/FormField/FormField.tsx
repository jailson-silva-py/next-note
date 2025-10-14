import styles from './FormField.module.css'

type FormFieldProps = {

    name:string,
    titleField: string,
    placeholder:string,
    textArea:boolean

} & React.ComponentProps<'input'>

const FormField = ({name, titleField, textArea=false, placeholder, ...props}:FormFieldProps) =>  {

    return (

        <div className={styles.formField} aria-label="field-form">

            <label htmlFor={name} role="label"
            className={styles.label}>
            {titleField}
            </label>
           
            {textArea ?
                <textarea className={styles.textArea} 
                name={name} placeholder={placeholder}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
                >
                    
                </textarea> 
                :
                <input type="text" name={name} placeholder={placeholder}
            className={`${styles.field}`} 
            {...props}/>
            }

            

        </div>
        

    )

}


export default FormField