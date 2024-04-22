import React from "react";
import { Box } from "@chakra-ui/react";

import { useIssuesStore } from "store";
import { IssueList } from "./IssueList";

export const Board = () => {
  const { repositoriesData, currentRepositoryUrl } = useIssuesStore();

  const currentRepositoryData = repositoriesData[currentRepositoryUrl];

  if (!currentRepositoryData) return null;

  const { todoIssues, inProgressIssues, doneIssues } = currentRepositoryData;

  return (
    <Box
      data-cy-id="boardContainer"
      sx={{ display: "flex", gap: "35px", marginTop: "35px" }}
    >
      <IssueList
        listTitle="ToDo"
        currentIssueCategory="todoIssues"
        issues={todoIssues}
      />
      <IssueList
        listTitle="In Progress"
        currentIssueCategory="inProgressIssues"
        issues={inProgressIssues}
      />
      <IssueList
        listTitle="Done"
        currentIssueCategory="doneIssues"
        issues={doneIssues}
      />
    </Box>
  );
};
