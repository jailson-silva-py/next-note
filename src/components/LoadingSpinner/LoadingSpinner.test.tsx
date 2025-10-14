import { render, screen } from "@testing-library/react"
import { expect } from "vitest"
import LoadingSpinner from "./LoadingSpinner"

describe('Testando componente loading spinner', () => {

    it('Possui o spinner', () => {

        render(<LoadingSpinner/>)

        const loading = screen.getByRole('loading-spinner')

        expect(loading).toBeInTheDocument()

    })

})