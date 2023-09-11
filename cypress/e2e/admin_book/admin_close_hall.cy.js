import loginData from "../../fixtures/login_data.json";
import seats2book from "../../fixtures/seats_2_book.json"
import selsBookAdminName from "../../fixtures/get_name_from_admin_book_seat.json";

describe("testing admin page func-ty for closing/opening sales", () => {

  it("should disable ticket booking for selected hall", () => {

    cy.visit("http://qamid.tmweb.ru/admin/");
    cy.adminLogin(loginData.admin);
    cy.get("section.conf-step#start-sales input.conf-step__radio[data-hall-id='1920']").click();
    // выбираем зал №1 в разделе "Открыть продажи"

    const selToggleTicketSalesBtn = "section.conf-step#start-sales button.conf-step__button[data-hall-id='1920']";

    cy.get(selToggleTicketSalesBtn).should("have.text", "Закрыть продажу билетов");
    cy.get(selToggleTicketSalesBtn).click();
    cy.get(selToggleTicketSalesBtn).should("have.text", "Открыть продажу билетов")
    // проверяем, что текст на кнопке поменялся после взаимодействия
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    // переходим в клиентскую GUIню
    cy.get(selsBookAdminName.navDayTomorrow).click();
    // выбираем то самое "завтра" (потому как иначе придётся городить логику для проверки timestamp'ов, а это будет в другом тесте)
    cy.get("section.movie:nth-of-type(1) h3.movie-seances__hall-title").should("have.text", "Зал 2");

    // Т. к. в дефолтном состоянии страницы первым всегда отображается зал №1.

    cy.visit("http://qamid.tmweb.ru/admin/");
    cy.get("section.conf-step#start-sales input.conf-step__radio[data-hall-id='1920']").click();
    cy.get(selToggleTicketSalesBtn).click();
    // отщёлкиваем кнопку обратно, чтобы проверки не падали при перезапуске теста
    });

    
  })
