"use client";

import { FormEvent, useState } from "react"
import CustomRange from "../CustomRange/CustomRange"
import styles from './FormPreferences.module.css'
import useFontFamily from "@/hooks/useFontFamily"
import useColorVariable from "@/hooks/useColorVariable"
import { HiChevronUpDown } from 'react-icons/hi2'
import useLocalStorage from "@/hooks/useLocalStorage"
import { PreferencesType } from "@/types/Preferences"


const FormPreferences = () => {
    
    const { setStorage, getStorage } = useLocalStorage()
    const [fontSize, setFontSize] = useState(() => {

        const config = getStorage<PreferencesType>('preferences')
        if(!config) return 22

        const size = parseInt(config.fontSize)
        return size

    })
    const { primaryColor, secondaryColor, 
        setPrimaryColor, setSecondaryColor } = useColorVariable()

    const { fontIndex, setFontIndex } = useFontFamily()
    

    const handleForm = (e:FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const dataFontIndex = parseInt(
            formData.get('selectFontFamily') as string
        )
        
        const pColor = formData.get('primaryColor')
        const sColor = formData.get('secondaryColor')

        fontIndex !== dataFontIndex && setFontIndex(dataFontIndex)
        setPrimaryColor(pColor)
        setSecondaryColor(sColor)
        
        setStorage('preferences', {

            primaryColor,
            secondaryColor,
            fontIndex:dataFontIndex,
            fontSize

        })

        console.log(getStorage('preferences'))
        

    }

    const resetForm = () => {

        setFontIndex(0)
        setFontSize(22)
        setPrimaryColor('#5b115b')
        setSecondaryColor('#390739')
        localStorage.removeItem('preferences')

    }
    

    return (

    <form onSubmit={handleForm} className={styles.form} onReset={resetForm}>

        <div className={styles.formRow} onReset={resetForm}>

            <label htmlFor="selectFontFamily">Tipo da Fonte</label>
            <div className={styles.selectContent}>
            <select name="selectFontFamily" defaultValue={fontIndex.toString()}
            className={styles.fontSelector} title="Escolha o tipo da fonte">

                <option value="0">Roboto</option>
                <option value="1">BadScript</option>
                <option value="2">Creepster</option>
                <option value="3">Montserrat</option>
                <option value="4">OpenSans</option>
                <option value="5">Urbanist</option>
                <option value="6">Allura</option>
                

            </select>
            <HiChevronUpDown className={styles.iconSelect}/>
            </div>

        </div>
        

        <div className={styles.formRow}>

            <CustomRange min={22} max={48} nameInput="fontSize" 
            title="Escolha o tamanho da fonte das notas (Ainda em testes)"
            value={fontSize} setValue={setFontSize}
            textLabel="Tamanho da fonte"/>

        </div>

        <div className={styles.formRow}>
    
        <div>Cores</div>
        <div className={styles.colorsContent}>

            <label htmlFor="primaryColor">Cor primária</label>
            <input type="color"  defaultValue={primaryColor}
            name="primaryColor" id="primaryColor" 
            className={styles.inputColor}/>

            <label htmlFor="secondaryColor">Cor secundária</label>
            <input type="color" defaultValue={secondaryColor}
            name="secondaryColor" id="secondaryColor" 
            className={styles.inputColor}/>

        </div>
        </div>
        
        <div className={styles.formRow}>
        <div className={styles.btnsForm}>
        <button className={styles.reset}
        type="reset">
            Resetar
        </button>
        <button type="submit" className={styles.submit}>
            Salvar
        </button>
        </div>

        </div>
        

    </form>

    )

}

export default FormPreferences