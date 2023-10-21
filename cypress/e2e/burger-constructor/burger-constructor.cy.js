import { localHost, testEmail, testPassword, testUrl } from "../../consts";

describe('service is available', function () {

   beforeEach(function () {
      cy.intercept('GET', `${testUrl}/api/ingredients`, { fixture: 'ingredients.json' })
      window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"))
      cy.setCookie('accessToken', 'test-accessToken')
      cy.visit("/");
      cy.viewport(1000, 1000)
      cy.get('[data-cy=constructor_container]').as('constructorContainer')
      cy.get('[data-cy=ingredients_container]').as('ingredientsContainer')
   });
   it('should contain Соберите бургер', function () {
      cy.contains('Соберите бургер')
   });

   it('should be disabled button without ingredient', function () {
      cy.get('button').contains('Оформить заказ').should('have.attr', 'disabled');
   });
   it('should set ingredient to constructor', function () {
      cy.get('@ingredientsContainer').contains('Соус Spicy-X').trigger('dragstart').trigger('drag', {})
      cy.get('@constructorContainer').trigger('dragover')
      cy.get('@constructorContainer').trigger('drop')
      cy.get('button').contains('Оформить заказ').should('not.have.attr', 'disabled');
   });
   it('should be redirect to login page', function () {
      cy.get('@ingredientsContainer').contains('Test булка N-200i').trigger('dragstart').trigger('drag', {})
      cy.get('@constructorContainer').trigger('dragover')
      cy.get('@constructorContainer').trigger('drop')
      cy.get('@ingredientsContainer').contains('Соус Spicy-X').trigger('dragstart').trigger('drag', {})
      cy.get('@constructorContainer').trigger('dragover')
      cy.get('@constructorContainer').trigger('drop')
      cy.get('button').contains('Оформить заказ').should('not.have.attr', 'disabled');
      cy.get('[data-cy=make_order]').click();
      cy.url().should('be.equal', `${localHost}/login`)
   });
   it('should make order', function () {
      cy.get('@ingredientsContainer').contains('Test булка N-200i').trigger('dragstart').trigger('drag', {})
      cy.get('@constructorContainer').trigger('dragover')
      cy.get('@constructorContainer').trigger('drop')
      cy.get('@ingredientsContainer').contains('Соус Spicy-X').trigger('dragstart').trigger('drag', {})
      cy.get('@constructorContainer').trigger('dragover')
      cy.get('@constructorContainer').trigger('drop')
      cy.get('[data-cy=burger_price]').contains(2600)
      cy.get('button').contains('Оформить заказ').should('not.have.attr', 'disabled');
      cy.get('[data-cy=make_order]').click();
      cy.url().should('be.equal', `${localHost}/login`);
      cy.get('input').first().type(testEmail)
      cy.get('input').eq(1).type(testPassword)
      cy.get('button').click()
      cy.intercept("POST", `${testUrl}/api/auth/login`, { fixture: "auth.json" }).as('getUser')
      cy.wait('@getUser')
      cy.url().should('be.equal', `${localHost}/`);
      cy.get('[data-cy=make_order]').click();
      cy.intercept("POST", `${testUrl}/api/orders`, { fixture: "orders.json" }).as('getOrder')
      cy.wait('@getOrder')
      cy.contains('идентификатор заказа')
      cy.get('[data-cy=modal_close]').click();
      cy.get('[data-cy=modal_close]').should('not.exist')
   });

}); 