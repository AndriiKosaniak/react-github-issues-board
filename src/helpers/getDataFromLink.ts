const buildGithubLinks = ({
  owner = "",
  repo = "",
}: {
  owner: string;
  repo: string;
}) => {
  const linkBase = "https://github.com";
  const linkToOwner = owner ? linkBase + `/${owner}` : "";
  const linkToRepo = linkToOwner ? linkToOwner + `/${repo}` : "";

  return {
    linkToOwner,
    linkToRepo,
  };
};
export const getDataFromLink = (link: string) => {
  const regex = /^(https?:\/\/)?(www\.)?github\.com\/([^/]+)\/([^/]+)\/?.*$/;
  const match = link.match(regex);

  if (!match)
    return {
      owner: "",
      repo: "",
      linkToOwner: "",
      linkToRepo: "",
    };

  const owner = match[3];
  const repo = match[4];

  const { linkToOwner, linkToRepo } = buildGithubLinks({ owner, repo });

  return { owner, repo, linkToOwner, linkToRepo };
};
