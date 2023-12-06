import React from 'react'
import BookContainer from '../../src/client/components/BookContainer'

describe('<BookContainer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BookContainer />)
  });
  it('makes a fetch request on load', () =>{
    cy.intercept('GET', 'https://openlibrary.org/subjects/health.json?limit=12&offset=0', (req) => {
      req.reply({ statusCode: 200, body: { data: 'mocked response' } });
    }).as('fetchRequest');
    cy.mount(<BookContainer />);
    cy.wait('@fetchRequest').then((interception) => {
      // Check if the request was made
      expect(interception).to.exist;
      expect(interception.response.statusCode).to.equal(200); // Ensure the response status is as expected
      // Additional assertions if needed based on the intercepted request/response
    });
  });
  it('makes a fetch request on scrolldown', () =>{
    cy.mount(<BookContainer />);
    cy.intercept('GET', 'https://openlibrary.org/subjects/health.json?limit=12&offset=24', (req) => {
      req.reply({ statusCode: 200, body: { data: 'mocked response for scroll down' } })
    }).as('scrollRequest');
    cy.wait(1000);
    cy.scrollTo('bottom');
    cy.wait('@scrollRequest').then((interception) => {
      // Check if the request was made
      expect(interception).to.exist;
      expect(interception.response.statusCode).to.equal(200); // Ensure the response status is as expected
      // Additional assertions if needed based on the intercepted request/response
    });
  })
})