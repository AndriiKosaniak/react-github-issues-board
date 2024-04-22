import React from "react";
import { Box } from "@chakra-ui/react";

import { InputLinkForm, Board, GithubLinkBreadcrumbs } from "components";

export const GithubBoardPage = () => {
  return (
    <Box py={8} px={6}>
      <InputLinkForm />
      <GithubLinkBreadcrumbs />
      <Board />
    </Box>
  );
};
