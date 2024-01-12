const example = /* HTML */ `<sp-search-field>
  <input spSearchFieldInput aria-label="Search" placeholder="Search" />
</sp-search-field>`;

describe("SearchField", () => {
  it("clears the input when Escape is pressed", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.realPress("Escape");
    cy.get("input").should("have.value", "");
  });

  it("submits the search when Enter is pressed", () => {
    const onSubmit = cy.stub();
    cy.mount(
      `<sp-search-field>
          <input
            spSearchFieldInput
            (spSearchFieldSubmitted)="onSubmit($event)"
            aria-label="Search"
            placeholder="Search"
          />
        </sp-search-field>`,
      { componentProperties: { onSubmit } }
    );
    cy.get("input").type("s");
    cy.realPress("Enter");
    cy.wrap(onSubmit).should("be.calledOnceWith", "s");
  });

  it("clears the input when clear button is pressed", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.findByRole("button").click();
    cy.get("input").should("have.value", "");
    cy.get('input').should('have.focus') // focus on search input after clearing the value
  });

  // Adding this section to test the alert value after clearing the search input.
  // Alert should get an empty value after clicing the clear button.
  it("clear input by click button then submit the serch and get alert value", () => {
    const onSubmit = cy.stub();
    cy.mount(
      `<sp-search-field>
          <input
            spSearchFieldInput
            (spSearchFieldSubmitted)="onSubmit($event)"
            aria-label="Search"
            placeholder="Search"
          />
        </sp-search-field>`,
      { componentProperties: { onSubmit  } }
    );
    cy.get("input").type("s");
    cy.findByRole("button").click();
    cy.on ('window:alert', onSubmit);
    cy.realPress("Enter")
    .then(() => {
      expect(onSubmit).to.be.calledWith('');  
    }) 
  });

  it("sets the expected aria-label on the clear button", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.findByRole("button", { name: "Clear search" });
  });

  it("focuses the input when the box (including the search icon) is clicked", () => {
    cy.mount(example);
    cy.root().realClick({ x: 8, y: 15 });
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 18, y: 15 });
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 290, y: 15 });
    cy.get("input").should("be.focused");
  });
});
