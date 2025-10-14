import { ThemeProvider as NextThemeProvider } from 'next-themes'

type Iprops = React.ComponentProps<typeof NextThemeProvider> 
& 
{children:React.ReactNode}

const ThemeProvider:React.FC<Iprops> = ({children, ...props}) => {

    return (

        <NextThemeProvider themes={['light', 'dark']} {...props}>
            {children}
        </NextThemeProvider>

    )

}

export default ThemeProvider