import React from "react";
import { Box } from "@chakra-ui/react";

import { InputLinkForm, Board, GithubLinkBreadcrumbs } from "components";

function App() {
  return (
    <Box py={8} px={6}>
      <InputLinkForm />
      <GithubLinkBreadcrumbs />
      <Board />
    </Box>
  );
}

export default App;
