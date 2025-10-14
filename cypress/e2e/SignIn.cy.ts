
describe('Teste da página Home', () => {

  it('A página possui um link', () => {

    cy.visit('/signin')
    cy.intercept('')
    cy.contains(/sign in with google/i).click()
    
  

  })

})