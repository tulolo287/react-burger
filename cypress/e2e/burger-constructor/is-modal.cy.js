import { testEmail, testPassword, testUrl } from "../../consts";

describe('service is available', function () {
   before(function () {
      cy.visit(testUrl);
   });
   it('should contain Соберите бургер', function () {
      cy.contains('Соберите бургер')
   });

   it('should be disabled button without ingredient', function () {
      cy.visit(testUrl);
      cy.get('button').contains('Оформить заказ').should('have.attr', 'disabled');
   });
   it('should set ingredient to constructor', function () {
      cy.visit(testUrl);
      cy.intercept('GET', `${testUrl}/ingredients`, { fixture: 'ingredients.json' })
      cy.get('[data-cy=ingredients_container]').contains('Соус Spicy-X').trigger('dragstart').trigger('drag', {})
      cy.get('[data-cy=constructor_container]').trigger('dragover')
      cy.get('[data-cy=constructor_container]').trigger('drop')
      cy.get('button').contains('Оформить заказ').should('not.have.attr', 'disabled');
   });
   it('should be redirect to login page', function () {
      cy.visit(testUrl);
      cy.intercept('GET', `${testUrl}/ingredients`, { fixture: 'ingredients.json' })
      cy.get('[data-cy=ingredients_container]').contains('Соус Spicy-X').trigger('dragstart').trigger('drag', {})
      cy.get('[data-cy=constructor_container]').trigger('dragover')
      cy.get('[data-cy=constructor_container]').trigger('drop')
      cy.get('button').contains('Оформить заказ').should('not.have.attr', 'disabled');
      cy.get('[data-cy=make_order]').click();
      cy.url().should('be.equal', `${testUrl}/login`)
   });
   it('should make order', function () {
      cy.visit(testUrl);
      cy.intercept('GET', `${testUrl}/ingredients`, { fixture: 'ingredients.json' })
      cy.get('[data-cy=ingredients_container]').contains('Соус Spicy-X').trigger('dragstart').trigger('drag', {})
      cy.get('[data-cy=constructor_container]').trigger('dragover')
      cy.get('[data-cy=constructor_container]').trigger('drop')
      cy.get('button').contains('Оформить заказ').should('not.have.attr', 'disabled');
      cy.get('[data-cy=make_order]').click();
      cy.url().should('be.equal', `${testUrl}/login`);
      cy.get('input').first().type(testEmail)
      cy.get('input').eq(1).type(testPassword)
      cy.get('button').click()
      cy.url().should('be.equal', `${testUrl}/`);
      cy.get('[data-cy=make_order]').click();
      //  cy.intercept("POST", `${testUrl}/orders`, { fixture: "orders.json" }).as('getOrders')
      cy.wait(20000)
      cy.contains('идентификатор заказа')
      cy.get('[data-cy=modal_close]').click();
      cy.get('[data-cy=modal_close]').should('not.exist')
   });


}); 