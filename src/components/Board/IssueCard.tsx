import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { convertDateIntoDaysAgo, figureOutDaysAgoLine } from "helpers";

import type { GithubIssue, IssueCategory } from "types";

type IssueCardProps = {
  currentIssueCategory: IssueCategory;
  issue: GithubIssue;
};

export const IssueCard = ({ issue, currentIssueCategory }: IssueCardProps) => {
  const handleOnDragStart = (e: React.DragEvent) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("issueId", String(issue.id));
      e.dataTransfer.setData("issueCategory", currentIssueCategory);
    }
  };

  const daysAgo = convertDateIntoDaysAgo(issue.created_at);

  return (
    <Box
      draggable
      data-cy-id="issueCard"
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
        #{issue.id} opened {figureOutDaysAgoLine(daysAgo)}
      </Text>
      <Text fontWeight="bold" textColor="gray">
        {issue.user?.login} | {issue.comments} comments
      </Text>
    </Box>
  );
};
