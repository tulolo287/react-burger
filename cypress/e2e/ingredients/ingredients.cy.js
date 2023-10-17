import { localHost, testUrl } from "../../consts";

describe('service is available', function () {
   beforeEach(function () {
      cy.intercept('GET', `${testUrl}/api/ingredients`, { fixture: 'ingredients.json' })
      cy.visit(localHost);
      cy.viewport(1000, 1000)
   });
   it('should contain Соберите бургер', function () {
      cy.contains('Соберите бургер')
   });
   it('should open and close modal', function () {
      cy.get('[data-cy=ingredients_container]').contains('Соус Spicy-X').click();
      cy.contains('Детали ингредиента')
      cy.get('[data-cy=modal_close]').click();
      cy.contains('Детали ингредиента').should('not.exist')
   });

});