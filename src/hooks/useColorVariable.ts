import { useEffect, useLayoutEffect, useState } from "react"
import useLocalStorage from "./useLocalStorage"
import { PreferencesType } from "@/types/Preferences"


const useColorVariable = () => {
    
    const { getStorage } = useLocalStorage()

    const [primaryColor, setPrimaryColor] = useState<any>(() => {

        const config = getStorage<PreferencesType>('preferences')
        if (config) return config.primaryColor

        const root = document.documentElement
         const colorP = getComputedStyle(root).getPropertyValue(
                '--primary-color')

        return colorP

    })
    const [secondaryColor, setSecondaryColor] = useState<any>(() => {

        const config = getStorage<PreferencesType>('preferences')
        if (config) return config.secondaryColor

        const root = document.documentElement
        const colorS = getComputedStyle(root).getPropertyValue(
        '--secondary-color')

        return colorS

    })

    useEffect(() => {

        const root = document.documentElement

        root.style.setProperty('--primary-color', primaryColor)
        root.style.setProperty('--secondary-color', secondaryColor)

    }, [primaryColor, secondaryColor])
   
    return { primaryColor, setPrimaryColor, 
        secondaryColor, setSecondaryColor }

}

export default useColorVariable