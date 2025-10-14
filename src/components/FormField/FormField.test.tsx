import { render, screen } from "@testing-library/react"
import FormField from "./FormField"

describe('Testando componente FormField', () => {

    test('Possui uma div content div', () => {

        render(<FormField name="username" 
            placeholder="Digite seu nome..."
            titleField="Nome do usuário:" textArea={false}/>)


        const content = screen.getByRole('generic', {name:'field-form'})
        
        expect(content).toBeInTheDocument()
            
    })

    test('Possui um label e um input', () => {

        render(<FormField name="username" 
            placeholder="Digite seu nome..."
            titleField="Nome do usuário:" textArea={false}/>)

        const label = screen.getByRole('label')
        const input = screen.getByPlaceholderText(
            'Digite seu nome...'
        )

       expect(label).toBeInTheDocument()
       expect(input).toBeInTheDocument()

    })


    test('Possui um label e um input', () => {

        render(<FormField name="username" 
            placeholder="Digite seu nome..."
            titleField="Nome do usuário:" textArea={false}/>)

        const label = screen.getByText("Nome do usuário:")

        expect(label).toBeInTheDocument()

    })


})