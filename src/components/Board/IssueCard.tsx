import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { convertDateIntoDaysAgo } from "helpers";

import type { GithubIssue, IssueCategory } from "types";

export const IssueCard = ({
  issue,
  currentIssueCategory,
}: {
  currentIssueCategory: IssueCategory;
  issue: GithubIssue;
}) => {
  const handleOnDragStart = (e: React.DragEvent) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("issueId", issue.id as unknown as string);
      e.dataTransfer.setData("issueCategory", currentIssueCategory);
    }
  };

  const daysAgo = convertDateIntoDaysAgo(issue.created_at);

  const figureOutDaysAgoLine = () => {
    switch (daysAgo) {
      case 0:
        return "today";
      case 1:
        return daysAgo + " day ago";
      default:
        return daysAgo + " days ago";
    }
  };

  return (
    <Box
      draggable
      data-issue-id={issue.id}
      onDragStart={handleOnDragStart}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",

        border: "1px solid black",
        borderRadius: "16px",

        padding: "8px 16px",
        width: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text align="left" fontWeight="bold">
        {issue.title}
      </Text>
      <Text fontWeight="bold" textColor="gray">
        #{issue.id} opened {figureOutDaysAgoLine()}
      </Text>
      <Text fontWeight="bold" textColor="gray">
        {issue.user?.login} | {issue.comments} comments
      </Text>
    </Box>
  );
};
