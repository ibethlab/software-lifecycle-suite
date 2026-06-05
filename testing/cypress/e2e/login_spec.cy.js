describe('Ecosistema Suite - Pruebas de Autenticación y Compra', () => {
  
  // Inicio de sesión en saucedemo.com
  it('Iniciar sesión correctamente en la plataforma de pruebas', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  // Flujo completo de compra
  it('Seleccionar un producto y completar el flujo de compra exitosamente', () => {
    // 1. Iniciar sesión primero para poder comprar
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // 2. Agregar el primer producto al carrito (Sauce Labs Backpack)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Validar que el icono del carrito cambie y marque "1" artículo
    cy.get('.shopping_cart_badge').should('be.visible').and('contain', '1');

    // 3. Ir al carrito de compras
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');

    // 4. Avanzar al Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // 5. Llenar el formulario de información de envío
    cy.get('[data-test="firstName"]').type('Lilian');
    cy.get('[data-test="lastName"]').type('Molina');
    cy.get('[data-test="postalCode"]').type('16001');
    cy.get('[data-test="continue"]').click();

    // 6. Verificar el resumen de la compra y finalizar
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_total_label').should('be.visible'); // Verifica que se calcule el total
    cy.get('[data-test="finish"]').click();

    // 7. Confirmar que la compra fue exitosa
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });
});