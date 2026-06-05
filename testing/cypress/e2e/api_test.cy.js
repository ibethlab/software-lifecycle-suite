//test simple para API pública
describe('Ecosistema Suite - Pruebas de API', () => {
  it('Verificar endpoint público exitosamente', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts/1').should((response) => {
      expect(response.status).to.eq(200);
    });
  });
});