describe('search products', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to search for products', () => {
    // cy.get('a[href^="/product"').first().click()

    // cy.get('input[name=q]').type('moletom').parent('form').submit()

    cy.searchByQuery('moletom')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    cy.get('a[href^="/product"').first().should('exist')
  })

  it('should not be able to visit search page without search query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
