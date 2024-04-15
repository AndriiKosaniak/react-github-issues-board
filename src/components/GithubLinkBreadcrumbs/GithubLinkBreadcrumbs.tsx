import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { useIssuesStore } from "store";
import { getDataFromLink } from "helpers";

export const GithubLinkBreadcrumbs = () => {
  const { currentRepositoryUrl } = useIssuesStore();

  const { owner, repo, linkToOwner, linkToRepo } =
    getDataFromLink(currentRepositoryUrl);

  if (!currentRepositoryUrl) return <></>;

  return (
    <Box
      id="githubLinkBreadcrumbsContainer"
      sx={{
        display: "flex",
        gap: "15px",
        marginTop: "10px",
        marginLeft: "5px",
      }}
    >
      <Link href={linkToOwner} isExternal>
        {owner}
      </Link>
      <Text>{">"}</Text>
      <Link href={linkToRepo} isExternal>
        {repo}
      </Link>
    </Box>
  );
};
