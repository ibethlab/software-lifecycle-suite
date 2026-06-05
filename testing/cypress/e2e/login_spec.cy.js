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
  // Control de errores: Credenciales incorrectas
  it('Validar el mensaje de error al intentar iniciar sesión con datos inválidos', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('usuario_no_existente');
    cy.get('[data-test="password"]').type('clave_incorrecta');
    cy.get('[data-test="login-button"]').click();

    // Validamos que aparezca el contenedor de error y el texto esperado del sistema
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  // Interactividad: Filtrado de productos por precio
  it('Filtrar productos de menor a mayor precio y verificar el ordenamiento', () => {
    // Inicio de sesión rápido
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Interactua con el selector/dropdown de ordenamiento por precio (lohi = low to high)
    cy.get('[data-test="product-sort-container"]').select('lohi');

    // Validamos que el primer producto de la lista sea el más económico ($7.99)
    cy.get('.inventory_item_price').first().should('contain', '$7.99');
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

    // Tomar una captura de pantalla como evidencia de la compra exitosa para visualizarla en Jenkins
    cy.screenshot('evidencia-compra-exitosa');
  });
});