describe('Consultancy Form', () => {

    it("should submit the individual consultancy form", () => {

        cy.start()

        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formúlarios', 'Consultoria')

  

})


})