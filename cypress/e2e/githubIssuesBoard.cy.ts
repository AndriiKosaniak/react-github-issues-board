describe("Tests for adding GitHub repositories issues to the page", () => {
  it("Searches for a repo then fetches issues and sets them into the board", () => {
    cy.visit("/");

    cy.get("#repositoryUrlInput").type("https://github.com/facebook/react");
    cy.get("#loadIssuesButton").click();

    cy.get("#githubLinkBreadcrumbsContainer")
      .should("contain", "facebook")
      .and("contain", "react");
    cy.get("#todoIssues").should("exist");
    cy.get("#inProgressIssues").should("exist");
    cy.get("#doneIssues").should("exist");
  });
  it("Searches for an invalid link and gets an error", () => {
    cy.visit("/");

    cy.get("#repositoryUrlInput").type("https://guthib.com/hkjhjkkjgjhjhj");
    cy.get("#loadIssuesButton").click();
    cy.get('[data-status="error"]').should("exist");
  });
  it("Drags and drops an issue card from 'todoIssues' to 'inProgressIssues'", () => {
    cy.visit("/");

    cy.get("#repositoryUrlInput").type("https://github.com/facebook/react");
    cy.get("#loadIssuesButton").click();

    cy.get("#todoIssues").find("[draggable=true]").first().as("todoIssue");

    cy.get("#inProgressIssues").as("inProgress");

    cy.get("@todoIssue").dragTo("#inProgressIssues");

    cy.get("#inProgressIssues")
      .find("[draggable=true]")
      .should("have.length", 2);
  });

  it.only("Drags and drops an issue card from 'inProgressIssues' to 'doneIssues', then searches for another repo and goes back to the previous one", () => {
    cy.visit("/");

    cy.get("#repositoryUrlInput").type("https://github.com/facebook/react");
    cy.get("#loadIssuesButton").click();

    cy.get("#inProgressIssues")
      .find("[draggable=true]")
      .first()
      .as("inProgressIssue");

    cy.get("#doneIssues").as("done");

    cy.get("@inProgressIssue").dragTo("@done");

    cy.get("#repositoryUrlInput")
      .clear()
      .type("https://github.com/cypress-io/cypress");
    cy.get("#loadIssuesButton").click().wait(2000);

    cy.get("#repositoryUrlInput")
      .clear()
      .type("https://github.com/facebook/react");
    cy.get("#loadIssuesButton").click();

    cy.get("#inProgressIssues")
      .find("[draggable=true]")
      .should("have.length", 0);
  });
  it("Drags and drops an issue card from 'doneIssues' to 'inProgressIssues', then reloads", () => {
    cy.visit("/");

    cy.get("#repositoryUrlInput").type("https://github.com/facebook/react");
    cy.get("#loadIssuesButton").click();

    cy.get("#doneIssues").find("[draggable=true]").first().as("doneIssue");

    cy.get("@doneIssue").dragTo("#inProgressIssues");

    cy.reload();

    cy.get("#doneIssues").find("[draggable=true]").should("have.length", 29);
  });
});
