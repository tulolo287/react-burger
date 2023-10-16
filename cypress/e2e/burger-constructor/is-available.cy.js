describe('service is available', function () {
   it('should be available on localhost:3000', function () {
      cy.visit('http://localhost:3000');
   });
   it('should contain Соберите бургер', function () {
      cy.contains('Соберите бургер')
   });
}); 