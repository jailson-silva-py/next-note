import { ChangeEvent } from 'react'
import { HiPlusSm, HiMinus } from 'react-icons/hi'
import styles from './CustomRange.module.css'

type CustomRangeProps = React.ComponentProps<'input'> & {

    nameInput:string,
    textLabel:string,
    min:number,
    max:number,
    value:number,
    setValue: React.Dispatch<React.SetStateAction<number>>

}

const CustomRange:React.FC<CustomRangeProps> = ({
    nameInput, textLabel, min, max, value, setValue, ...props
}) => {

    const handleChangeRange = (e:ChangeEvent<HTMLInputElement>) => {

        const number = parseInt(e.target.value)

        setValue(number)

    }

    return (

        <div className={styles.customRangeContent}
        aria-label="customRangeContent"> 

            <label role="label" 
            htmlFor={nameInput} className={styles.titleRange}>
                {textLabel}
            </label>

        <div className={styles.rangeContent}>
            
            <HiMinus className={styles.minus}/>
            
            <div className={styles.falseRangeContent}>
                
                <div className={styles.falseRange}>   
                
                <div style={{width: `${((value - min) / (max - min)) * 100}%`}} 
                className={styles.falseRangeFill}></div>
                <p className={styles.sizeInfo}>{value}</p>
                

                </div>
                
            </div> 
         
            <input  role="range"
            type='range' min={min} max={max} value={value}
            name={nameInput} id={nameInput} className={styles.customRange} 
            onChange={handleChangeRange}
            {...props}/>

            <HiPlusSm className={styles.sum}/>

        </div>

        </div>
        

    )

}

export default CustomRange