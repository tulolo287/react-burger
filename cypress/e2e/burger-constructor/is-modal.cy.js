import { testUrl } from "../../consts";

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
   it('should close modal', function () {
      cy.visit(testUrl);
      cy.get('[data-cy=modal_close]').click();
      cy.get('[data-cy=order_details]').should('not.exist')
   });

}); 