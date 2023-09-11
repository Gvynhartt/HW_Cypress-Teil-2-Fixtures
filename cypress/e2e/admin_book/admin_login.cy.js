import adminLoginSels from "../../fixtures/admin_login_sels.json";
import loginData from "../../fixtures/login_data.json";

describe("admin login tests", () => {
  it("should login as admin with valid data", () => {
    cy.visit("http://qamid.tmweb.ru/admin/");
    cy.adminLogin(loginData.admin);
  });

  it("should login as admin with INVALID data", () => {
    // этот сценарий написан полностью, а не кастомной командой, т.к. видны уже другие страницы, на которые нужно сделать ассёрты
    cy.visit("http://qamid.tmweb.ru/admin/");
    cy.get(adminLoginSels.inputEmail).type(loginData.ADMINGUS.email);
    cy.get(adminLoginSels.inputPassword).type(loginData.ADMINGUS.password);
    cy.get(adminLoginSels.buttonSignIn).click();
    cy.url().should(
      "eq",
      "http://qamid.tmweb.ru/admin/scripts/authorization.php"
    );
    cy.contains("Ошибка авторизации!").should("be.visible");
  });
});
