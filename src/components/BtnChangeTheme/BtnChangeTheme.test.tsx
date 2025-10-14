import { expect, test, describe } from "vitest";
import { screen, render, renderHook} from "@testing-library/react"
import BtnChangeTheme from "./BtnChangeTheme";
import { userEvent } from '@testing-library/user-event'
import { useTheme } from "next-themes";
import NextThemeProvider from "../ThemeProvider/ThemeProvider";

const ThemeWrapper = ({children}:{children:React.ReactNode}) => {

    return <NextThemeProvider attribute="data-theme" 
        defaultTheme="light"
        disableTransitionOnChange>{children}</NextThemeProvider>

}

describe("Teste do componente BtnChangeTheme", () => {

    test('Retorna um Botão corretamente', async () => {

    render(<BtnChangeTheme/>)

    const button = await screen.findByRole("button")

    expect(button).toBeInTheDocument()

    })


    test("Ao clicar no botão, muda o tema", async () => {
    
        render(<BtnChangeTheme/>, {wrapper:ThemeWrapper})

        const button = await screen.findByRole("button")

        expect(button).toBeInTheDocument()

        const {result} = renderHook(
            () => useTheme(), {wrapper:ThemeWrapper})
        expect(result.current.theme).toBe('light')

        await userEvent.click(button)
       
        const {result:updatedRedult} = renderHook(
            () => useTheme(), {wrapper:ThemeWrapper})
        expect(updatedRedult.current.theme).toBe('dark')
    
    })


})
