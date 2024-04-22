import type { DragEvent } from "react";
import type { GithubIssue } from "types";

export const findInsertIndex = (
  event: DragEvent<HTMLDivElement>,
  issues: GithubIssue[]
) => {
  const { currentTarget, clientY } = event;
  const { top } = event.currentTarget.getBoundingClientRect();

  const mouseY = clientY - top + currentTarget.scrollTop;

  let insertIndex = issues.findIndex((issue) => {
    const cardElement = currentTarget.querySelector(
      `[data-issue-id="${issue.id}"]`
    );

    if (!cardElement) return false;

    const cardRect = cardElement.getBoundingClientRect();
    const cardTop = cardRect.top - top + currentTarget.scrollTop;
    const cardBottom = cardRect.bottom - top + currentTarget.scrollTop;
    return mouseY > cardTop && mouseY < cardBottom;
  });

  if (insertIndex === -1) {
    insertIndex = issues.length;
  }

  return insertIndex;
};
