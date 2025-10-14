import { render, screen } from "@testing-library/react"
import Form from "./Form"

describe('Testando o Componente Form', () => {

    test('O form tá setando o children corretamente', () => {

        render (<Form><p>Teste</p></Form>)

        const form = screen.getByRole('form')
        const p = screen.getByRole('paragraph')

        expect(form).toBeInTheDocument()
        expect(p).toBeInTheDocument()


    })
    

})