import  { useTheme } from 'next-themes'
import { HiOutlineMoon, HiOutlineSun, HiSun } from 'react-icons/hi'
import { HiMoon } from 'react-icons/hi2'
import styles from './BtnChangeTheme.module.css'

const BtnChangeTheme = () => {

    const {theme, setTheme} = useTheme()

    const toogleTheme = () => {

        setTheme(theme === 'light' ? 'dark':'light')

    }

    return (
    <button onClick={toogleTheme} className={styles.btnTheme}>

      {theme === 'light' ? 
        
        <HiOutlineMoon size={32}/>
        :
        <HiOutlineSun size={32}/>

      }  

    </button>)

}

export default BtnChangeTheme