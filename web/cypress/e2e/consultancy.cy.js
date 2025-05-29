/// <reference types="Cypress" />
describe('Consultancy Form', () => {
  it.only('should submit the individual consultancy form', () => {
    cy.start()

    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.goTo('Formulários', 'Consultoria')

    cy.get('#name').type('Fernando Papito')

    cy.get('input[placeholder="Digite seu email"]').type('papito@test.com.br')

    cy.get('input[placeholder="(00) 00000-0000"]')
      .type('11999991000')
      .should('have.value', '(11) 99999-1000')

    //cy.get('#consultancyType').select('In Company') usando ID para encontrar

    //Caso não tenha o ID, pode usar uma conversão similiar ao XPath
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select('Individual')

    cy.contains('label', 'Pessoa Física')
      .find('input')
      .click()
      .should('be.checked')

    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('be.not.checked')

    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type('85175986449')
      .should('have.value', '851.759.864-49')

    /*
                Pode usar o placeholder como localizador também
             
                cy.get('input[placeholder="000.000.000-00"]')
                .type('85175986449')
                .should('have.value', '851.759.864-49')
    
            */

    /*
    
        cy.contains("label", "Instagram")
          .find("input")
          .check()
          .should("be.checked");
    
          */

    const discoveryChannels = [
      'Instagram',
      'LinkedIn',
      'Udemy',
      'YouTube',
      'Indicação de Amigo',
    ]

    discoveryChannels.forEach((channel) => {
      cy.contains('label', channel).find('input').check().should('be.checked')
    })

    //Upload de arquivo. Precisa interagir com um elemento que está Hidden, o cypress não consegue usar a janela de upload pois não é um elemento HTML.
    cy.get('input[type="file"]')
      .should('be.not.visible')
      .selectFile('./cypress/fixtures/doc1.pdf', { force: true })

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    ).type(
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.'
    )

    const techs = ['Cypress', 'Java', 'Robot Framework', 'PW', 'C#']

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type('{enter}')

      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tech)
        .should('be.visible')
    })

    cy.contains('label', 'termos de uso').find('input').check()

    cy.contains('button', 'Enviar formulário').click()

    cy.get('.modal')
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    
  })

  it('Verify required fields', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.goTo('Formulários', 'Consultoria')

    cy.contains('button', 'Enviar formulário').click()

    cy.contains('label', 'Nome Completo *')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('label', 'Email *')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('p', 'Você precisa aceitar os termos de uso')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')
  })
})
