describe('service is available', function () {
   it('should be available on localhost:3000', function () {
      cy.visit('/');
   });
   it('should contain Соберите бургер', function () {
      cy.contains('Соберите бургер')
   });
}); 