import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { useIssuesStore } from "store";
import { findInsertIndex } from "helpers";
import { IssueCard } from "./IssueCard";

import type { IssueCategory, GithubIssue } from "types";

type IssueListProps = {
  listTitle: string;
  currentIssueCategory: "todoIssues" | "inProgressIssues" | "doneIssues";
  issues: GithubIssue[];
};

export const IssueList = ({
  listTitle,
  currentIssueCategory,
  issues,
}: IssueListProps) => {
  const { moveIssueBetweenCategories } = useIssuesStore();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { dataTransfer } = e;

    if (!dataTransfer) return;

    const issueId = parseInt(dataTransfer.getData("issueId"));
    const sourceIssueCategory: IssueCategory = dataTransfer.getData(
      "issueCategory"
    ) as IssueCategory;

    const destinationIssueCategory = currentIssueCategory as IssueCategory;

    if (!issueId || !sourceIssueCategory) return;

    const insertIndex = findInsertIndex(e, issues);

    moveIssueBetweenCategories(
      sourceIssueCategory,
      destinationIssueCategory,
      issueId,
      insertIndex
    );
  };

  return (
    <Box
      data-cy-id={currentIssueCategory}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        minWidth: "0",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",

        border: "1px solid black",
        borderRadius: "6px",

        padding: "16px 8px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        backgroundColor: "#D3D3D3",
      }}
    >
      <Text fontSize="2xl">{listTitle}</Text>
      {issues.map((issue, index) => (
        <IssueCard
          key={issue.id}
          currentIssueCategory={currentIssueCategory}
          issue={issue}
        />
      ))}
    </Box>
  );
};
