import { Roboto, Bad_Script, Creepster,
        Montserrat, Open_Sans, Urbanist,
        Allura
 } from "next/font/google"
import { useEffect, useState } from "react"
import useLocalStorage from "./useLocalStorage"
import { PreferencesType } from "@/types/Preferences"

 const roboto = Roboto({

        display:'swap',
        weight:['200', '300', '500', '700', '900'],
        subsets:['latin']

})

const badscript = Bad_Script({

        display:'swap',
        weight:['400'],
        subsets:['latin']

})

const creepster = Creepster({

        display:'swap',
        weight:['400'],
        subsets:['latin']

})

const montserrat = Montserrat({

        display:'swap',
        weight:['300', '500', '700', '900'],
        subsets:['latin']

})

const openSans = Open_Sans({

        display:'swap',
        weight:['400', "300", "700"],
        subsets:['latin']

    })

const urbanist = Urbanist({

        display:'swap',
        weight:['200', '300', '500', '700', '900'],
        subsets:['latin']

})

const allura = Allura({

        display:'swap',
        weight:['400'],
        subsets:['latin']

})

 const arrayFonts = [roboto, badscript, 
creepster, montserrat, openSans,
urbanist, allura]


const useFontFamily = () => {
    
    const { getStorage } = useLocalStorage()
    const [fontIndex, setFontIndex] = useState(() => {

        const config = getStorage<PreferencesType>('preferences')

        if (config) {

            return parseInt(config.fontIndex)

        }

        const fontBody = getComputedStyle(document.body).fontFamily
        
        const objFontBody = arrayFonts.filter((value) => {
            
            const fontValueArray = value.style.fontFamily.replaceAll(/["']/g, '').split(',')
            if (fontBody.includes(fontValueArray[0])) {

                return true

            }
            

        })

        const indexFontBody = arrayFonts.indexOf(objFontBody[0])


        return indexFontBody

        })


        const getFont = (index:number) => {

            return arrayFonts[index]

        }

        useEffect(() => {

            const font = getFont(fontIndex)

            document.body.className = font.className
            

        }, [fontIndex])


    return { fontIndex, setFontIndex }

}

export default useFontFamily