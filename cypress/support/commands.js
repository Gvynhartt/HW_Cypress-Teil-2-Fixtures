import adminLoginSels from "../fixtures/admin_login_sels.json";

Cypress.Commands.add('adminLogin', (loginObj) => {

    cy.get(adminLoginSels.inputEmail).type(loginObj.email); // потом вынести в отдельный метод
    cy.get(adminLoginSels.inputPassword).type(loginObj.password);
    cy.get(adminLoginSels.buttonSignIn).click();
    cy.url().should("eq", "http://qamid.tmweb.ru/admin/index.php");
    cy.get(adminLoginSels.adminLobbySubttl).should(
      "have.text",
      "Администраторррская"
    );

})

