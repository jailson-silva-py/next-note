import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import CustomRange from "./CustomRange"
import userEvent from "@testing-library/user-event"
import { useState } from "react"

describe("Testando o componente customRange", () => {
    
    var value = 0
    const setValue = vi.fn((newValue) => {value = newValue})

    test("Possui um input e label", () => {

        render(<CustomRange textLabel="Font size:" 
            nameInput="fontSize" min={0} max={100} 
            value={value} setValue={setValue}/>)

        const label = screen.getByRole('label')
        const input = screen.getByRole('range')

        expect(input.tagName).toBe('INPUT')
        expect(label.tagName).toBe('LABEL')

    })

    test("O value é settado corretamente", async () => {

        const { result } = renderHook(() => useState(10)) 

        render(<CustomRange textLabel="Font size:" 
            nameInput="fontSize" min={0} max={100} 
            value={result.current[0]}
            setValue={result.current[1]}/>)
            
        const input = screen.getByRole('range')

        expect(result.current[0]).toBe(10)
   
    })

})