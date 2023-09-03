import loginData from "../fixtures/login_data.json";
import seats2book from "../fixtures/seats_2_book.json"
import selsBookAdminName from "../fixtures/get_name_from_admin_book_seat.json";

describe("book movie by name from admin lobby (ШТА?)", () => {
  it("should get movie names from admin lobby", () => {

    let chosenMovieName = ''; // здесь сохраняем название фильма, на который далее купим билет
    cy.visit("http://qamid.tmweb.ru/admin/");
    cy.adminLogin(loginData.admin);
    // выбираем элемент админского фронтенда, где хранятся названия всех фильмов на одном уровне
    cy.get(selsBookAdminName.movieNameFromAdminPlanner)
      .should("have.length", 3)
      .then((movies) => {
        chosenMovieName = movies[0].innerText; // вибираем первый фильм из списка ("Зверополис"),

        cy.visit("http://qamid.tmweb.ru/client/index.php"); // переходим в клиентский фронтенд

        // и да, это всё делается внутри одного then, потому что а) я тупой, б) Cypress не заточен
        // под сохранение чего бы то ни было в переменные в) wrap().as() и затем alias работать не хотят
        cy.get(selsBookAdminName.navDayTomorrow).click();

        cy.contains(chosenMovieName)
        .parents(selsBookAdminName.movieSectionParent)
        .find(selsBookAdminName.movieSeanceTime)
        .then(seanceBtns => { cy.get(seanceBtns[0]).click() })
        // или вместо стрелочной функции можно городить километровую соплю из потомков, но зачем?

        cy.url().should("eq", "http://qamid.tmweb.ru/client/hall.php");

        seats2book.forEach(reservoirSpot => { // этот цикл добавлен для гибкости тестов (e.g. нужен билет на несколько мест сразу)

          cy.get(`div.buying-scheme__row:nth-of-type(${reservoirSpot.nmbRow}) span.buying-scheme__chair:nth-of-type(${reservoirSpot.nmbSeat})`).click();
          // соответственно, неясно, как вынести селектор - шаблонную строку в фикстуру (или же это слишком заморочно)
        })

        cy.get(selsBookAdminName.buttonConfirm).click();
        cy.url().should("eq", "http://qamid.tmweb.ru/client/payment.php");
        cy.get(selsBookAdminName.ticketMovieTitle).should('have.text', chosenMovieName);
        // проверяем, что в билете указано ранее выцепленное название фильма
        cy.get(selsBookAdminName.buttonConfirm).click();
        cy.url().should("eq", "http://qamid.tmweb.ru/client/ticket.php");
        cy.get(selsBookAdminName.ticketQRcode).should("be.visible");
        cy.get(selsBookAdminName.multichipTicketCollector).should("have.text", "Покажите QR-код нашему контроллеру для подтверждения бронирования.");
      });

    
  });
});
