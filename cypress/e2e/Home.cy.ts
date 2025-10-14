
describe('Teste da página Home', () => {

  it('A página possui um link', () => {

    cy.visit('/')
    cy.contains(/crie uma tarefa/i)
    .click()
    cy.wait(3000)
    cy.url().should('include', '/signin')
  

  })

})