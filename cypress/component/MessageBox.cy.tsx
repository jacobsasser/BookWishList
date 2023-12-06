import React from "react";
import MessageBox from "../../src/client/components/MessageBox";
import useStore from "../../src/client/store";

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
};

describe("<MessageBox />", () => {
  it("initially renders", () => {
    cy.mount(<MessageBox />);
    // see: https://on.cypress.io/mounting-react
    cy.get("[data-cy=message]").should(
      "have.text",
      "Add books below to get started."
    );
    cy.get("[data-cy=viewButton]").should("have.text", "View (0)");
    cy.get("[data-cy=viewButton]").should("be.disabled");
  });
  it("should change text based on if a book is added", () => {
    cy.mount(<MessageBox />);
    useStore.setState({ message: ["add", "Test Title"] });
    cy.get("[data-cy=message]").should(
      "have.text",
      "Added Test Title to your list."
    );
  });
  it("should change text based on if a book is removed", () => {
    cy.mount(<MessageBox />);
    useStore.setState({ message: ["remove", "Test Title"] });
    cy.get("[data-cy=message]").should(
      "have.text",
      "Removed Test Title from your list."
    );
  });
  it("should change view counter when a result is saved", () =>{
    cy.mount(<MessageBox />);
    useStore.setState({savedResults:[testData1]});
    cy.get("[data-cy=viewButton]").should("have.text", "View (1)");
    cy.get("[data-cy=viewButton]").should("not.be.disabled");
  });
  it('should open modal when view button is clicked', () =>{
    cy.mount(<MessageBox />);
    useStore.setState({savedResults:[testData1]});
    cy.get("[data-cy=viewButton]").click();
    cy.get("[data-cy=modal]").should('exist');
    cy.get("[data-cy=list]").should('have.text', 'Test Title');
  });
  it('should close modal', () => {
    cy.mount(<MessageBox />);
    useStore.setState({savedResults:[testData1]});
    cy.get("[data-cy=viewButton]").click();
    cy.get("[data-cy=closeModal]").should('exist');
    cy.get("[data-cy=closeModal]").click();
    cy.get("[data-cy=modal]").should('not.exist');
  })
});
