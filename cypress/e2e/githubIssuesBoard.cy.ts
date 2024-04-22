describe("Tests for adding GitHub repositories issues to the page", () => {
  it("Searches for a repo then fetches issues and sets them into the board", () => {
    cy.visit("/");

    cy.get("[data-cy-id=repositoryUrlInput]").type(
      "https://github.com/facebook/react"
    );
    cy.get("[data-cy-id=loadIssuesButton]").click();

    cy.get("[data-cy-id=githubLinkBreadcrumbsContainer]")
      .should("contain", "facebook")
      .and("contain", "react");

    cy.get("[data-cy-id=linkToOwner]").should(
      "have.attr",
      "href",
      "https://github.com/facebook"
    );

    cy.get("[data-cy-id=linkToRepo]").should(
      "have.attr",
      "href",
      "https://github.com/facebook/react"
    );

    cy.get("[data-cy-id=todoIssues]").should("exist");
    cy.get("[data-cy-id=inProgressIssues]").should("exist");
    cy.get("[data-cy-id=doneIssues]").should("exist");
  });
  it("Searches for an invalid link and gets an error", () => {
    cy.visit("/");

    cy.get("[data-cy-id=repositoryUrlInput]").type(
      "https://guthib.com/hkjhjkkjgjhjhj"
    );
    cy.get("[data-cy-id=loadIssuesButton]").click();

    cy.contains("Oops! An issue has occurred!").should("exist");
  });
  it("Drags and drops an issue card from 'todoIssues' to 'inProgressIssues'", () => {
    cy.visit("/");

    cy.get("[data-cy-id=repositoryUrlInput]").type(
      "https://github.com/facebook/react"
    );
    cy.get("[data-cy-id=loadIssuesButton]").click();

    cy.get("[data-cy-id=todoIssues]")
      .find("[data-cy-id=issueCard]")
      .first()
      .as("todoIssue");

    cy.get("@todoIssue").dragTo("[data-cy-id=inProgressIssues]");

    cy.get("[data-cy-id=inProgressIssues]")
      .find("[data-cy-id=issueCard]")
      .should("have.length", 2);
  });

  it("Drags and drops an issue card from 'inProgressIssues' to 'doneIssues', then searches for another repo and goes back to the previous one", () => {
    cy.visit("/");

    cy.get("[data-cy-id=repositoryUrlInput]").type(
      "https://github.com/facebook/react"
    );
    cy.get("[data-cy-id=loadIssuesButton]").click();

    cy.get("[data-cy-id=inProgressIssues]")
      .find("[data-cy-id=issueCard]")
      .first()
      .as("inProgressIssue");

    cy.get("[data-cy-id=doneIssues]").as("done");

    cy.get("@inProgressIssue").dragTo("@done");

    cy.get("[data-cy-id=repositoryUrlInput]")
      .clear()
      .type("https://github.com/cypress-io/cypress");
    cy.get("[data-cy-id=loadIssuesButton]").click().wait(2000);

    cy.get("[data-cy-id=repositoryUrlInput]")
      .clear()
      .type("https://github.com/facebook/react");
    cy.get("[data-cy-id=loadIssuesButton]").click();

    cy.get("[data-cy-id=inProgressIssues]")
      .find("[data-cy-id=issueCard]")
      .should("have.length", 0);
  });
  it("Drags and drops an issue card from 'doneIssues' to 'inProgressIssues', then reloads", () => {
    cy.visit("/");

    cy.get("[data-cy-id=repositoryUrlInput]").type(
      "https://github.com/facebook/react"
    );
    cy.get("[data-cy-id=loadIssuesButton]").click();

    cy.get("[data-cy-id=doneIssues]")
      .find("[data-cy-id=issueCard]")
      .first()
      .as("doneIssue");

    cy.get("@doneIssue").dragTo("[data-cy-id=inProgressIssues]");

    cy.reload();

    cy.get("[data-cy-id=doneIssues]")
      .find("[data-cy-id=issueCard]")
      .should("have.length", 29);
  });
});
