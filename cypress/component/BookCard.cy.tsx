import React from "react";
import BookCard from '../../src/client/components/BookCard'

const testData1 = {
  key:'Test Key',
  title:'Test Title',
  edition_count:1,
  cover_id:1,
  cover_edition_key:'Test Editon Key',
  subject:['Test Subj 1', 'Test Subj 2'],
  ia_collection:['Test IA collection'],
  lendinglibrary:false,
  printdisabled:false,
  lending_edition:'Test Lending',
  lending_identifier:'Test Lending ID',
  authors:[{key: 'Author Key 1', name:'Test Author 1'}],
  first_publish_year:2023,
  ia:null,
  public_scan:false,
  has_fulltest:false
}
const testData2 = {
  key:'Test Key',
  title:'Test Title',
  edition_count:1,
  cover_id:1,
  cover_edition_key:'Test Editon Key',
  subject:['Test Subj 1', 'Test Subj 2'],
  ia_collection:['Test IA collection'],
  lendinglibrary:false,
  printdisabled:false,
  lending_edition:'Test Lending',
  lending_identifier:'Test Lending ID',
  authors:[{key: 'Author Key 1', name:'Test Author 1'}, {key: 'Author Key 2', name:'Test Author 2'}],
  first_publish_year:2023,
  ia:null,
  public_scan:false,
  has_fulltest:false
}


describe('BookCard', () => {
  it('mounts with title, name, and year published with single Author',() => {
    cy.mount(<BookCard data={testData1}/>);
    cy.get('[data-cy=cardHeader]').should('have.text', 'Test Title');
    cy.get('[data-cy=cardAuthors]').should('have.text', 'Authors: Test Author 1');
    cy.get('[data-cy=cardPublish]').should('have.text', 'Published: 2023');
  }),
  it('mounts with title, authors, and year published with multiple authors', () => {
    cy.mount(<BookCard data={testData2}/>);
    cy.get('[data-cy=cardHeader]').should('have.text', 'Test Title');
    cy.get('[data-cy=cardAuthors]').should('have.text', 'Authors: Test Author 1 et. al');
    cy.get('[data-cy=cardPublish]').should('have.text', 'Published: 2023');
  }),
  it('swaps button text between add and remove', () => {
    cy.mount(<BookCard data={testData1}/>);
    cy.get('[data-cy=cardButton]').should('have.text', 'Add');
    cy.get('[data-cy=cardButton]').click();
    cy.get('[data-cy=cardButton]').should('have.text', 'Remove');
    cy.get('[data-cy=cardButton]').click();
    cy.get('[data-cy=cardButton]').should('have.text', 'Add');
  })
})