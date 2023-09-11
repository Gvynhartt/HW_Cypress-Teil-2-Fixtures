import homePageSels from '../../fixtures/homepage_display_sels.json';

describe('homepage visibilty tests', () => {
  it('should display 7 day elements in navbar', () => {
    cy.visit('http://qamid.tmweb.ru/client/index.php');
    cy.get(homePageSels.navDay).should("have.length", 7);
  })
})