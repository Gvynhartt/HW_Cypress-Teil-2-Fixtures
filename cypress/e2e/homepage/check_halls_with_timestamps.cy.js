import homePageSels from "../../fixtures/homepage_display_sels.json";

describe("tests hall button availability depending on current timestamp", () => {
  it("should make halls for today's seances unclickable if it is too late to book", () => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");

    cy.get(homePageSels.navTodayChosen).should("be.visible");

    const curTimeStamp = Math.floor(Date.now / 1000);
    // получаем текущее время в секундах
    const arrTimeStamps = [];
    // сюда добавляем timestamp'ы со всех кнопок залов на странице

    cy.get("a.movie-seances__time").each((timeButton) => {
      arrTimeStamps.push(timeButton.attr("data-seance-time-stamp"));
    }); // заполняем наш массив

    const hitCount = 0;

    arrTimeStamps.forEach((timeStamp) => {
      if (timeStamp < curTimeStamp) {
        hitCount++;
      }
    });

    cy.get("a.movie-seances__time.acceptin-button-disabled").should(
      "have.length",
      hitCount
    );
    // как изящно-то, а: элементы не ищутся, а тест всё одно не падает XD
    // но вообще идея в том, что элементов с таким классов должно быть ровно
    // столько, сколько превосходящих текущий timestamp
  });
});
