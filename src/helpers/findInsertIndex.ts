import { DragEvent } from "react";
import { GithubIssue } from "types";

export const findInsertIndex = (
  event: DragEvent<HTMLDivElement>,
  issues: GithubIssue[]
) => {
  const containerRect = event.currentTarget.getBoundingClientRect();
  const mouseY =
    event.clientY - containerRect.top + event.currentTarget.scrollTop;

  let insertIndex = issues.findIndex((issue) => {
    const cardElement = event.currentTarget.querySelector(
      `[data-issue-id="${issue.id}"]`
    );
    if (!cardElement) return false;
    const cardRect = cardElement.getBoundingClientRect();
    const cardTop =
      cardRect.top - containerRect.top + event.currentTarget.scrollTop;
    const cardBottom =
      cardRect.bottom - containerRect.top + event.currentTarget.scrollTop;
    return mouseY > cardTop && mouseY < cardBottom;
  });

  if (insertIndex === -1) {
    insertIndex = issues.length;
  }

  return insertIndex;
};
