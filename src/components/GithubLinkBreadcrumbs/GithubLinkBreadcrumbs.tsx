import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { useIssuesStore } from "store";
import { getDataFromLink } from "helpers";

export const GithubLinkBreadcrumbs = () => {
  const { currentRepositoryUrl } = useIssuesStore();

  const { owner, repo, linkToOwner, linkToRepo } =
    getDataFromLink(currentRepositoryUrl);

  if (!currentRepositoryUrl || (!owner && !repo)) return null;

  return (
    <Box
      data-cy-id="githubLinkBreadcrumbsContainer"
      sx={{
        display: "flex",
        gap: "15px",
        marginTop: "10px",
        marginLeft: "5px",
      }}
    >
      <Link data-cy-id='linkToOwner' href={linkToOwner} isExternal>
        {owner}
      </Link>
      <Text>{">"}</Text>
      <Link data-cy-id='linkToRepo' href={linkToRepo} isExternal>
        {repo}
      </Link>
    </Box>
  );
};
