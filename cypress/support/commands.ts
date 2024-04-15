import React from "react";

declare global {
  namespace Cypress {
    interface Chainable {
      dragTo(targetEl: string): Chainable;
      drag(target: string, options?: Partial<TypeOptions>): Chainable<Element>;
    }
  }
}

Cypress.Commands.add(
  "dragTo",
  { prevSubject: "element" },
  (subject: JQuery<HTMLElement>, targetEl: string) => {
    const dataTransfer = new DataTransfer();
    cy.wrap(subject).trigger("dragstart", { dataTransfer });
    cy.get(targetEl)
      .scrollIntoView()
      .trigger("drop", { dataTransfer, force: true });
  }
);
